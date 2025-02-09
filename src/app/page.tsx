"use client";

import { AboutUs, Hero, Testimonials } from "./components";
import { Journals } from "@/app/components";
import { Agendas } from "./components";
import { useSession } from "next-auth/react";
import Loading from "./loading";

export default function HomePage() {
  const { status } = useSession();

  if (status === "loading") return <Loading />;

  return (
    <>
      <Hero />
      <AboutUs />
      <Journals />
      <Agendas />
      <Testimonials />
    </>
  );
}
