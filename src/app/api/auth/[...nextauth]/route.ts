/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserByEmail, loginWithGoogle } from "@/lib/firebase/service";
import NextAuth, { AuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/types/User";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "google") {
        const userData = await getUserByEmail(user.email);
        // if register
        if (!userData) {
          const data = {
            email: user.email,
            fullname: user.name,
            type: "google",
            username: uuidv4(),
            bio: "Describe yourself.",
            image: user.image,
            role: "member",
          };
          await loginWithGoogle(
            data,
            (result: { status: boolean; data: any }) => {
              if (result.status) {
                token.email = result.data.email;
                token.role = result.data.role;
                token.type = result.data.type;
              }
            }
          );
        }
        // if login
        if (userData) {
          await loginWithGoogle(
            userData,
            (result: { status: boolean; data: any }) => {
              if (result.status) {
                token.email = result.data.email;
                token.role = result.data.role;
                token.type = result.data.type;
              }
            }
          );
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        if ("email" in token) {
          session.user.email = token.email;
        }

        if ("role" in token) {
          session.user.role = token.role;
        }

        if ("type" in token) {
          session.user.type = token.type;
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
