import { createFileRoute } from "@tanstack/react-router";
import { clearSessionCookie } from "@/lib/site-auth";

export const Route = createFileRoute("/api/auth/logout")({
  server: {
    handlers: {
      POST: async () =>
        new Response(JSON.stringify({ ok: true }), {
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": clearSessionCookie(),
          },
        }),
    },
  },
});
