import { auth } from "@/lib/auth";
import { UserNav } from "@/components/dashboard/user-nav";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
          {session?.user && <UserNav user={session.user} />}
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Welcome, {session?.user?.username ?? session?.user?.name}
          </h2>
          <p className="text-muted-foreground">
            Your dashboard is ready. Start scanning your GitHub followers to find
            non-followers.
          </p>
        </div>
      </main>
    </div>
  );
}
