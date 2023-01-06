import NextAuth, { type NextAuthOptions } from "next-auth";
import YandexProvider from "next-auth/providers/yandex"
import CredentialsProvider from "next-auth/providers/credentials"
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { hash, verify } from "argon2";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      if (!session.user)
        return session;

      if (user)
        session.user.id = user.id;

      if (token)
        session.user.email = token.email;

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    }
  },
  session: {
    strategy: "jwt"
  },
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } })

        if (!user)
          return null

        var passwordMatch = await verify(user?.password, credentials?.password ?? "")

        if (!passwordMatch)
          return null

        return user;
      }
    }),
    YandexProvider({
      clientId: env.YANDEX_CLIENT_ID,
      clientSecret: env.YANDEX_CLIENT_SECRET
    })
  ],
};

export default NextAuth(authOptions);
