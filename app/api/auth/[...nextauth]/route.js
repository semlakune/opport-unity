import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import {exclude} from "@/lib/utils";

const login = async (credentials) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        username: credentials.username,
      },
      select: {
        id: true,
        username: true,
        password: true,
        name: true,
        userType: true,
        employerId: true,
        profile: {
          select: {
            id: true,
            userId: true,
            bio: true,
            resume: true,
            skills: true,
            photo: true,
          }
        },
        employer: {
          select: {
            id: true,
            logo: true,
            userId: true
          }
        },
      }
    });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Wrong credentials!");

    user = exclude(user, ["password"]);

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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }