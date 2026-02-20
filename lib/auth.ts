import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/encrypt";

import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:follow",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || account.provider !== "github") return false;

      const githubId = String(account.providerAccountId);
      const accessToken = encrypt(account.access_token!);

      await prisma.user.upsert({
        where: { githubId },
        update: {
          username: user.name ?? "",
          email: user.email,
          avatarUrl: user.image,
          accessToken,
        },
        create: {
          githubId,
          username: user.name ?? "",
          email: user.email,
          avatarUrl: user.image,
          accessToken,
        },
      });

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.githubId = String(account.providerAccountId);
        token.username = (profile as { login?: string }).login ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user = session.user as any;
        user.githubId = token.githubId ?? "";
        user.username = token.username ?? "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
