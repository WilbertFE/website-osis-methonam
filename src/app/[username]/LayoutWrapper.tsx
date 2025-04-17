/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { User } from "@/types/User";
import { Hero } from "./components";
import { Profile } from "./components";
import { Settings } from "./components";
import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function LayoutWrapper({ user }: { user: User }) {
  const { data: session, status }: any = useSession();

  if (status === "loading") return <Loading />;

  return (
    <>
      <Hero user={user} />
      {session && session.user.username === user.username && (
        <>
          <Profile user={user} />

          <Settings />
        </>
      )}
    </>
  );
}
