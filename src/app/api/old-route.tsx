import { getCloudflareContext } from "@opennextjs/cloudflare";

// Export the handlers
export async function GET(request: Request): Promise<Response> {    
    // Handle different API endpoints
    if (request.url.includes('get-users')) {
        return handleGetUsers();
    } else if (request.url.includes('get-jobs')) {
    //   return handleGetJobListings(request.url);
        return new Response('jobs', { status: 200 });
    } else if (request.url === '/') {
      return new Response("URL needs to be more specific", { status: 200 });
    } else {
      return new Response("Not Found", { status: 404 });
    }
}

/**
 * Retrieves all users from the D1 database.
 * @param request The incoming HTTP request.
 * @param env The environment object.
 * @returns A Response containing the list of users or an error.
 */
const handleGetUsers = async (): Promise<Response> => {
    // for testing:
    // return Response.json(JSON.stringify(mockUsers), {
    //     headers: { 'Content-Type': 'application/json' },
    //     status: 200
    // });

    try {
        const vbNamespace = getCloudflareContext().env.VONBERGEN_DB;
        
        // Query all users from the D1 database
        const results = await vbNamespace.prepare(
            "SELECT * FROM Users"
        );

        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.error("Error lgetting users:", e);
        return Response.json(JSON.stringify({ error: e.message || "Internal Server Error" }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
  };

/**
 * Retrieves a user's job listings from the D1 database.
 * @param request The incoming HTTP request.
 * @param env The environment object.
 * @returns A Response containing the list of users or an error.
 */
// const handleGetJobListings = async (url: string, env: Env): Promise<Response> =>  {
//     try {
//       const userId = url.toString().split('/')[1];
//       console.log('userId', userId)
//       // Query job listings by user_id
//       const { results, error } = await env.VONBERGEN_DB.prepare(
//         "SELECT id, title, url FROM Listings WHERE is_deleted = 0 and user_id = ? ORDER BY id DESC LIMIT 100"
//       ).bind(userId).all();

//       if (results) {
//         return new Response(JSON.stringify(results), {
//           status: 200
//         });
//       } else {
//         console.error("D1 query error:", error);
//         return new Response(JSON.stringify({ error: "Failed to retrieve users." }), {
//           status: 500
//         });
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (e: any) {
//       console.error("Error lgetting users:", e);
//       return Response.json(JSON.stringify({ error: e.message || "Internal Server Error" }), {
//         status: 500
//       });
//     }
//   };
