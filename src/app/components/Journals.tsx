/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { Journal } from "@/components/fragments";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Journals() {
  return (
    <div className="w-full flex flex-col pt-36 pb-32 px-8">
      <h1 className="text-center font-bold text-3xl tracking-wide">Jurnal</h1>
      <div className="my-2"></div>
      <div className="flex flex-col items-center gap-y-6">
        {[1, 2, 3].map((val, i) => (
          <div key={i}>
            <div className="my-2"></div>
            <Journal />
          </div>
        ))}

        <Link href="/journals">
          <Button className="text-white font-bold">Lebih</Button>
        </Link>
      </div>
    </div>
  );
}
