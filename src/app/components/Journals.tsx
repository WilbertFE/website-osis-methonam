/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { Journal } from "@/components/fragments";
import { Button } from "@/components/ui/button";
import { Journal as JournalType } from "@/types/Journal";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Journals() {
  const [journals, setJournals] = useState<null | JournalType[]>(null);

  const getJournals = async () => {
    const res: {
      statusCode: number;
      message: string;
      journals: JournalType[] | null;
    } = await fetch("/api/journals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (res.journals) setJournals(res.journals);
    return res;
  };

  useEffect(() => {
    getJournals();
  }, []);

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
            <Link href="/journals">
              <Button className="text-white font-bold">Lebih</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
