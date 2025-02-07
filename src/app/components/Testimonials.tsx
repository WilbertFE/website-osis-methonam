import React from "react";
import { InfiniteMovingCardsDemo } from "@/components/blocks/infinite-moving-cards-demo";

export default function Testimonials() {
  return (
    <div className="flex flex-col w-full pt-36 pb-32">
      <h1 className="text-center font-bold text-3xl tracking-wide">
        Kata Mereka
      </h1>
      <span className="text-sm text-center text-foreground-400">
        tentang OSIS
      </span>
      <div className="my-8" />
      <div className="flex justify-center flex-col">
        <InfiniteMovingCardsDemo />
      </div>
    </div>
  );
}
