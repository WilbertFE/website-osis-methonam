import { Agenda } from "@/components/fragments";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Agendas() {
  return (
    <div className="flex flex-col w-full pt-36 pb-32">
      <h1 className="text-center font-bold text-3xl tracking-wide">
        Agenda Terkini
      </h1>
      <div className="my-2"></div>
      <div className="flex flex-col items-center gap-y-6">
        {[1, 2, 3].map((e, i) => (
          <div key={i}>
            <div className="my-2"></div>
            <Agenda />
          </div>
        ))}
        <Link href="/journals">
          <Button className="text-white font-bold">Lebih</Button>
        </Link>
      </div>
    </div>
  );
}
