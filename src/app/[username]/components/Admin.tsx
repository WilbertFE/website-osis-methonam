/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowRight, Calendar1, NotebookPen } from "lucide-react";
import Link from "next/link";

export default function Admin() {
  return (
    <>
      <div className="w-full flex flex-col px-4 gap-y-2">
        <span>Admin</span>
        <div className="flex flex-col gap-y-3 border p-3 rounded-lg">
          <Link href="/admin/journals" className="flex gap-x-2 cursor-pointer">
            <NotebookPen />
            <span className="flex-1 line-clamp-1">Journals</span>
            <ArrowRight />
          </Link>
          <Separator />

          <Link href="/admin/agendas" className="flex gap-x-2 cursor-pointer">
            <Calendar1 />
            <span className="flex-1 line-clamp-1">Agendas</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
}
