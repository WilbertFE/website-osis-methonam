"use client";

import Loading from "@/app/loading";
import { Journal } from "@/components/fragments";
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
import { Journal as JournalType } from "@/types/Journal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type response = {
  statusCode: number;
  message: string;
};

export default function AdminJournals() {
  const { status } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
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

  if (status === "loading") return <Loading />;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    const data = new FormData(e.currentTarget);
    const title = data.get("title");
    const tagline = data.get("tagline");
    const content = data.get("content");
    const credit = data.get("credit");

    try {
      const res: response = await fetch("/api/journals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          tagline,
          content,
          credit,
        }),
      }).then((res) => res.json());

      setIsDisabled(false);
      toast(res.message);
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full gap-y-8 flex flex-col px-4 pt-12 pb-32">
      <div className="space-y-4">
        <div className="flex gap-x-2">
          <Input type="text" placeholder="Search journals" className="flex-1" />
          <Button>Search</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              Add journal
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full z-[1000] overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Add Journal</SheetTitle>
              <SheetDescription>Adding New Journal</SheetDescription>
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
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tagline" className="text-right">
                    Tagline
                  </Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    placeholder="Enter tagline"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="credit" className="text-right">
                    Credit
                  </Label>
                  <Input
                    id="credit"
                    name="credit"
                    placeholder="Enter credit"
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
      {journals && journals.length > 0 && (
        <div className="space-y-4">
          {journals.map((data: JournalType, i) => (
            <Journal data={data} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}
