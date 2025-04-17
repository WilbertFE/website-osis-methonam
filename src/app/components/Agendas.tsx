/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Agenda } from "@/components/fragments";
import { Agenda as AgendaType } from "@/types/Agenda";

const agendas: AgendaType[] = [
  {
    title: "Classmeet Mobile Legends",
    countdown: "countdown",
    date: "5 Mei 2025",
    image: "/img/integritas.jpeg",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint eligendi aliquam. Quasi iure unde animi molestiae, atque sapiente perferendis sunt incidunt, inventore excepturi commodi dolores tempore explicabo quisquam repudiandae!",
  },
];

export default function Agendas() {
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
              <Agenda data={data} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
