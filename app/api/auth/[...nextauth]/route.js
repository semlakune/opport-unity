import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {exclude} from "@/lib/utils";
import prisma from "@/db/prisma";

const login = async (credentials) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        username: credentials.username,
      },
      include: { profile: true, employer: true }
    });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Wrong credentials!");

    user = exclude(user, ['password', 'createdAt', 'updatedAt'])

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
          return await login(credentials);
        } catch (err) {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (user) {
        return true;
      }
      return false;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userDetails = user;
      }
      if (trigger === "update" && session?.user) {
        token.userDetails = session.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.userDetails;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/"
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }