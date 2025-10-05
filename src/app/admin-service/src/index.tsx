import { ExportedHandler, Response, Service } from "@cloudflare/workers-types";
import type { AdminStore } from "../../api/src/index.tsx";

interface Env {
	STORE: Service<AdminStore>;
}

export default {
	async fetch(request, env) {
		// In a production app, you'd want to protect this with Cloudflare Access
		// and validate any incoming requests by checking their `CF_Authorization` header
		// https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/

		const method = request.method.toUpperCase();
		const { pathname } = new URL(request.url);

		if (method === "GET" && pathname === "/") {
            const formData = await request.formData();
			const action = formData.get("action");

			if (typeof action !== "string") {
			    return new Response('invalid action', { status: 200 })
			}

			switch (action) {
				case "get-exclusion-strings":
					await env.STORE.getUserExclusions(formData);
					break;
				default:
			        return new Response('invalid action', { status: 200 })
			}
        };

		if (method === "POST" && pathname === "/") {
			const formData = await request.formData();
			const action = formData.get("action");

			if (typeof action !== "string") {
			    return new Response('invalid action', { status: 200 })
			}

			switch (action) {
				case "post-listings":
					await env.STORE.batchIngestion(formData);
					break;
				default:
			        return new Response('invalid action', { status: 200 })
			}
		}

		return new Response(null, { status: 404 });
	},
} as ExportedHandler<Env>;
