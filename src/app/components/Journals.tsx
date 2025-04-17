/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { Journal } from "@/components/fragments";
import { Journal as JournalType } from "@/types/Journal";

const journals: JournalType[] = [
  {
    title: "Hari Paskah 2025",
    credit: "Wilbert Bernardi",
    tagline: "Tes",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil impedit, eaque sunt error expedita alias quod a. Magni doloremque sint illum tempora aspernatur, officia commodi quo fuga? Quia, eos atque!",
  },
];

export default function Journals() {
  return (
    <>
      {journals && journals.length > 0 && (
        <div className="w-full flex flex-col pt-36 pb-32 px-8">
          <h1 className="text-center font-bold text-3xl tracking-wide">
            Jurnal
          </h1>
          <div className="my-2"></div>
          <div className="flex flex-col items-center gap-y-6">
            {journals.map((data, i) => (
              <div key={i}>
                <div className="my-2"></div>
                <Journal data={data} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
