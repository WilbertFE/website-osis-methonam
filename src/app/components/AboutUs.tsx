"use client";

import { TracingBeamDemo } from "../../components/blocks/tracing-beam-demo";
import { Dummy } from "@/types/Dummy";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutUs() {
  const dummyContent: Dummy[] = [
    {
      title: "OSIS Periode 2024/2025",
      description: (
        <>
          <p>
            Pada 28 Oktober 2024, OSIS SMAS Methodist-6 Medan dilantik dan resmi
            beroperasi.
          </p>
        </>
      ),
      badge: "Pelantikan - 28 Oktober 2024",
      image: "/img/fotbar.jpeg",
    },

    {
      title: "OSIS Periode 2023/2024",
      description: (
        <>
          <p>
            Mengwujudkan SIKAT pada SMAS Methodist-6 Medan. Dengan mewujudkan
            siswa yang solid, berintegritas, kreatif, berakhlak mulia, dan
            mengaplikasikan teknologi.
          </p>
        </>
      ),
      badge: "Harapan 1 tahun ke depan",
      image: "/img/solidaritas.jpeg",
    },
  ];

  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col pb-32 pt-12 px-4">
      <h1 className="text-3xl tracking-wider font-bold">Tentang OSIS</h1>
      <div className="my-4"></div>
      <TracingBeamDemo dummyContent={dummyContent} />
      {pathname !== "/about" && (
        <Link href="/about" className="mx-auto">
          <Button className="mx-auto text-white p-4 tracking-wide">
            Kenali
          </Button>
        </Link>
      )}
    </div>
  );
}
