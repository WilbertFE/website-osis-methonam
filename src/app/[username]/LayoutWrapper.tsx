/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { User } from "@/types/User";
import React, { useEffect, useState } from "react";
import { Hero } from "./components";
import { Info } from "./components";
import { Admin, Settings } from "./components";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/lib/firebase/service";

export default function LayoutWrapper({ user }: { user: User }) {
  const { data: session, status }: any = useSession();
  const [myData, setMyData] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session.user) {
      const getUserAsync = async () => {
        const user = await getUserByEmail(session.user.email);
        setMyData(user);
      };
      getUserAsync();
    }
  }, [session, status]);

  return (
    <>
      <Hero user={user} />
      {myData && myData.username === user.username && (
        <>
          <Info user={user} />
          {session.user.role === "admin" && <Admin />}
          <Settings />
        </>
      )}
    </>
  );
}
