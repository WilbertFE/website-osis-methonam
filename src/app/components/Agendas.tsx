/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Agenda } from "@/components/fragments";
// import { Button } from "@/components/ui/button";
import { Agenda as AgendaType } from "@/types/Agenda";
import { useSession } from "next-auth/react";
// import Link from "next/link";
import { useEffect, useState } from "react";

export default function Agendas() {
  const [agendas, setAgendas] = useState<null | AgendaType[]>(null);
  const { data: session }: any = useSession();
  const getAgendas = async () => {
    const res: {
      statusCode: number;
      message: string;
      agendas: AgendaType[] | null;
    } = await fetch("/api/agendas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    if (res.agendas && res.agendas.length > 0) setAgendas(res.agendas);
    return res;
  };

  console.log("session2: ", session);

  useEffect(() => {
    getAgendas();
  }, []);
  return (
    <div className="flex flex-col w-full pt-36 pb-32">
      <h1 className="text-center font-bold text-3xl tracking-wide">
        Agenda Terkini
      </h1>
      <div className="my-2"></div>
      <div className="flex flex-col items-center gap-y-6">
        {agendas && agendas.length > 0 && (
          <div className="space-y-4">
            {agendas.map((data: AgendaType, i) => (
              <Agenda role={session?.user.role} data={data} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
