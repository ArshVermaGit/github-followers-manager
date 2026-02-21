import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt";
import { GitHubAPIError } from "@/lib/github";
import { User } from "@prisma/client";

export type AuthenticatedApiHandler = (
  req: Request,
  context: {
    params: Record<string, string>;
    user: User;
    unencryptedToken: string;
  }
) => Promise<NextResponse>;

export function withGitHubAuth(handler: AuthenticatedApiHandler) {
  return async (req: Request, { params }: { params?: Record<string, string> }) => {
    try {
      const session = await auth();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const githubId = (session?.user as any)?.githubId;

      if (!session || !githubId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const user = await prisma.user.findUnique({
        where: { githubId },
      });

      if (!user || !user.accessToken) {
        return NextResponse.json(
          { error: "User or access token not found" },
          { status: 401 }
        );
      }

      let unencryptedToken: string;
      try {
        unencryptedToken = decrypt(user.accessToken);
      } catch (error) {
        console.error("Token decryption failed:", error);
        return NextResponse.json(
          { error: "Invalid access token state" },
          { status: 401 }
        );
      }

      return await handler(req, {
        params: params || {},
        user,
        unencryptedToken,
      });
    } catch (error) {
      console.error("[GitHub API Handler Error]:", error);

      if (error instanceof GitHubAPIError) {
        return NextResponse.json(
          { error: error.message, retryAfter: error.retryAfter },
          { status: error.status }
        );
      }

      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
