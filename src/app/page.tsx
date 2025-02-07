"use client";

import { useEffect, useState } from "react";
import { AboutUs, Hero, Testimonials } from "./components";
import { Journals } from "@/app/components";
import { Agendas } from "./components";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
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
