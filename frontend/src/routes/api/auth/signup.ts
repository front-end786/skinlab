import { createFileRoute } from "@tanstack/react-router";
import { createSiteUser, signSessionToken, sessionCookie } from "@/lib/site-auth";

export const Route = createFileRoute("/api/auth/signup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const email = String(body.email ?? "");
          const password = String(body.password ?? "");
          const name = String(body.name ?? "");
          if (!email || !password) {
            return Response.json({ error: "Email and password are required" }, { status: 400 });
          }
          if (password.length < 6) {
            return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 });
          }
          const user = await createSiteUser({ email, password, name });
          const token = await signSessionToken(user);
          return new Response(JSON.stringify({ user }), {
            status: 201,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": sessionCookie(token),
            },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "Signup failed";
          const status = message.includes("already") ? 409 : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
