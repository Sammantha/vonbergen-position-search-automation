import { RpcTarget, WorkerEntrypoint } from "cloudflare:workers";
import { IJobListing } from "../../../types";

interface Env {
	D1: D1Database;
	STORE: Service<AdminStore>;
}

export class PublicStore extends WorkerEntrypoint<Env> {
	async getListingsByUser(userId: number) {
		const listings = await this.env.D1.prepare(
			"SELECT * FROM listings WHERE userId = ?;",
		).bind(userId).all<IJobListing>();

		if (listings === null) {
			throw new Error("Failed to getListingsByUser");
		}

		return listings;
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
