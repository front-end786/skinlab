import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [{ title: "Sign up — SkinLab" }, { name: "description", content: "Create your SkinLab account." }],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  return (
    <AuthForm
      mode="signup"
      alternateHref="/login"
      alternateLabel="Already have an account? Sign in"
      onSubmit={async ({ email, password, name }) => {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Signup failed");
        navigate({ to: "/" });
      }}
    />
  );
}
