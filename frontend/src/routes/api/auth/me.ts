import { createFileRoute } from "@tanstack/react-router";
import { readSessionUser } from "@/lib/site-auth";

export const Route = createFileRoute("/api/auth/me")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await readSessionUser(request);
        if (!user) return Response.json({ user: null }, { status: 401 });
        return Response.json({ user });
      },
    },
  },
});
