import { RpcTarget, WorkerEntrypoint } from "cloudflare:workers";
import { IJobListing } from "../../../../types";

interface Env {
	D1: D1Database;
	STORE: Service<AdminStore>;
}

export class AuthedStore extends RpcTarget {
	#userId: number;
	#D1: D1Database;

	constructor(userId: number, d1: D1Database) {
		super();
		this.#userId = userId;
		this.#D1 = d1;
	}

	async getTasks() {
		return (
			await this.#D1
				.prepare(
					"SELECT id, title, completed FROM tasks WHERE user_id = ? ORDER BY created_at ASC;",
				)
				.bind(this.#userId)
				.all<{ id: number; title: string; completed: number }>()
		).results.map((task) => ({
			id: task.id,
			title: task.title,
			completed: task.completed === 1,
		}));
	}
}

export class PublicStore extends WorkerEntrypoint<Env> {
	async getListingsByUserId(userId: number) {
		const listings = await this.env.D1.prepare(
			"SELECT * FROM listings WHERE user_id = ?;",
		).bind(userId)
        .run();

		if (listings === null) {
			throw new Error("Failed to get listings by userId");
		}

		return listings;
	}

    async deleteListing(listingId: number) {
		return await this.env.D1.prepare("UPDATE listings SET isDeleted = 1 WHERE id = ?;")
        .bind(listingId)
        .run();
	}
}

export class AdminStore extends WorkerEntrypoint<Env> {
	async upsertListing(listing: IJobListing) {
		await this.env.D1.prepare(
			"INSERT OR IGNORE INTO listings (jobId) VALUES (?);",
		)
			.bind(listing)
			.run();
	}

    async batchIngestion(payload: JSON) {
        try {
            const listings: IJobListing[] = JSON.parse(payload.toString());
            if (listings.length > 0) {
                listings.forEach((listing: IJobListing) => {
                    this.upsertListing(listing);
                });
            }
        } catch(e: unknown) {
            console.log('Error parsing payload during batchIngestion: ', e);
        }
    }
}
