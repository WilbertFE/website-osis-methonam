"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Member } from "@/types/Member";

export function AppleCardsCarouselDemo({ data }: { data: Member[] }) {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Anggota OSIS
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
