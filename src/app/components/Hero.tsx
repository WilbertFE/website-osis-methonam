"use client";

import Image from "next/image";
import Icon from "/public/img/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Highlight } from "@/components/ui/hero-highlight";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  const visi = [
    "Solidaritas",
    "Integritas",
    "Kreatifitas",
    "Akhlak",
    "Teknologi",
  ];

  return (
    <div className="w-full flex flex-col min-h-screen rounded-b-md bg-cover bg-center bg-[url('/img/fotbar.jpeg')]">
      <div className="z-10 -mb-8 h-full flex flex-col justify-center items-center">
        <Highlight className="text-3xl font-bold tracking-wider bg-gradient-to-r from-biruMuda1 to-ungu px-1 rounded-lg">
          SIKAT
        </Highlight>
        <div className="my-2"></div>
        <h2 className="text-xl font-bold">
          Semua Misi, <Highlight>OSIS</Highlight> Siap Beraksi!!
        </h2>
        <div className="my-2"></div>
        <Image src={Icon} priority alt="Logo SIKAT" width={256} height={256} />
        <div className="my-2"></div>
        <div className="flex gap-2 tracking-wide flex-wrap justify-center">
          {visi.map((item, i) => (
            <Badge key={i}>{item}</Badge>
          ))}
        </div>
        <div className="my-4"></div>
        <Button asChild className="tracking-wider font-medium">
          <Link href="/contact">Hubungi</Link>
        </Button>
      </div>
    </div>
  );
}
