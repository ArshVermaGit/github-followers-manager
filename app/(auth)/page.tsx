import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LandingClient } from "./landing-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitClean - GitHub Non-Followers Cleaner",
  description: "Discover who doesn't follow you back on GitHub and clean your following list in bulk.",
};

export default async function LandingPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return <LandingClient />;
}
