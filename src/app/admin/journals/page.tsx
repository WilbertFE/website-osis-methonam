"use client";

import Loading from "@/app/loading";
import { Journal } from "@/components/fragments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type response = {
  statusCode: number;
  message: string;
};

export default function AdminJournals() {
  const { status } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);

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
        <form onSubmit={(e) => handleSubmit(e)}>
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
                <SheetClose asChild>
                  <Button type="submit">
                    {isDisabled ? "Loading..." : "Submit"}
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </form>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((e, i) => (
          <Journal key={i} />
        ))}
      </div>
    </div>
  );
}
