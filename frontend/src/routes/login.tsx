import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — SkinLab" }, { name: "description", content: "Sign in to your SkinLab account." }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <AuthForm
      mode="login"
      alternateHref="/signup"
      alternateLabel="Don't have an account? Sign up"
      onSubmit={async ({ email, password }) => {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Login failed");
        navigate({ to: "/" });
      }}
    />
  );
}
