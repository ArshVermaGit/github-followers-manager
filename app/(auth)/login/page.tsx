import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginButton } from "@/components/auth/login-button";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 rounded-lg border p-8 shadow-lg">
        <h1 className="text-2xl font-bold">GitHub Non-Followers Cleaner</h1>
        <p className="text-center text-sm text-muted-foreground">
          Sign in with your GitHub account to find and manage users who
          don&apos;t follow you back.
        </p>
        <LoginButton />
      </div>
    </div>
  );
}
