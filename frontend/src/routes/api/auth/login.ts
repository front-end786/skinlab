import { createFileRoute } from "@tanstack/react-router";
import { verifySiteUser, signSessionToken, sessionCookie } from "@/lib/site-auth";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const email = String(body.email ?? "");
          const password = String(body.password ?? "");
          if (!email || !password) {
            return Response.json({ error: "Email and password are required" }, { status: 400 });
          }
          const user = await verifySiteUser(email, password);
          const token = await signSessionToken(user);
          return new Response(JSON.stringify({ user }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": sessionCookie(token),
            },
          });
        } catch (err) {
          return Response.json(
            { error: err instanceof Error ? err.message : "Login failed" },
            { status: 401 },
          );
        }
      },
    },
  },
});
