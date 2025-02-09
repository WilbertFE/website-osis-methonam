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
import { useSession } from "next-auth/react";

export default function AdminJournals() {
  const { status } = useSession();

  if (status === "loading") return <Loading />;

  return (
    <div className="w-full gap-y-8 flex flex-col px-4 pt-36 pb-32">
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
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you re done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((e, i) => (
          <Journal key={i} />
        ))}
      </div>
    </div>
  );
}
