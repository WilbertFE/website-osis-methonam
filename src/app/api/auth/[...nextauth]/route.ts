/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginWithGoogle } from "@/lib/firebase/service";
import NextAuth, { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

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
        const userData = { ...user };
        delete userData.id;

        await loginWithGoogle(
          userData,
          ({ status, data }: { status: boolean; data: any }) => {
            if (status) {
              token.email = data.email;
              token.role = data.role;
              token.username = data.username;
              token.fullname = data.fullname;
              token.image = data.image;
            }
          }
        );
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

        if ("username" in token) {
          session.user.username = token.username;
        }

        if ("fullname" in token) {
          session.user.fullname = token.fullname;
        }

        if ("image" in token) {
          session.user.image = token.image;
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
