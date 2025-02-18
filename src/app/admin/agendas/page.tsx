/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/app/loading";
import { Agenda } from "@/components/fragments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Agenda as AgendaType } from "@/types/Agenda";

type response = {
  statusCode: number;
  message: string;
};

export default function AdminAgendas() {
  const { status } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const [agendas, setAgendas] = useState<null | AgendaType[]>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

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

  useEffect(() => {
    getAgendas();
  }, []);

  if (status === "loading") return <Loading />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    const data = new FormData(e.currentTarget);
    const title = data.get("title");
    const content = data.get("content");
    const dateData = date?.toISOString();

    try {
      const res: response = await fetch("/api/agendas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          date: dateData,
        }),
      }).then((res) => res.json());
      if (res.statusCode === 200) {
        toast(res.message);
        router.refresh();
      }
      setIsDisabled(false);
    } catch (e: any) {
      console.log(e);
      toast(e.message);
    }
  };
  return (
    <>
      <div className="w-full gap-y-8 flex flex-col px-4 pt-12 pb-32">
        <div className="space-y-4">
          <div className="flex gap-x-2">
            <Input
              type="text"
              placeholder="Search journals"
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                Add Agendas
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full z-[1000] overflow-y-scroll">
              <SheetHeader>
                <SheetTitle>Add Agenda</SheetTitle>
                <SheetDescription>Adding New Agenda</SheetDescription>
              </SheetHeader>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter title"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      placeholder="Enter content"
                      name="content"
                      id="content"
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Label htmlFor="date" className="text-left">
                      Date
                    </Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">
                    {isDisabled ? "Loading..." : "Submit"}
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        {agendas && agendas.length > 0 && (
          <div className="space-y-4">
            {agendas.map((data: AgendaType, i) => (
              <Agenda data={data} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
