import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

const prisma = new PrismaClient()

const login = async (credentials) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: credentials.username,
      },
    });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Wrong credentials!");

    return user;
  } catch (error) {
    throw new Error("Failed to login!");
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }