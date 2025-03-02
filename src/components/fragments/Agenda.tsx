"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FotoOsis from "@/../public/img/fotbar.jpeg";
import { Button } from "../ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "../ui/badge";
import { Agenda as AgendaType } from "@/types/Agenda";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function Agenda({
  data,
  role,
}: {
  data: AgendaType;
  role: any;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
        <CardDescription>{data.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={FotoOsis}
            alt="Valentine Days"
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col">
          <Drawer>
            <div className="flex justify-between w-full items-center">
              <Button asChild>
                <DrawerTrigger>Open</DrawerTrigger>
              </Button>
              <Badge>Countdown</Badge>
            </div>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{data.title}</DrawerTitle>
                <DrawerDescription>{data.date}</DrawerDescription>
                <DrawerDescription className="text-justify">
                  {data.content}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button asChild variant="destructive">
                  <DrawerClose>Cancel</DrawerClose>
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {role === "admin" ? (
            <>
              <div className="my-4"></div>
              <div className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when youre
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input id="title" className="col-span-3" />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="date" className="text-left">
                          Date
                        </Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border w-[250px]"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <Label htmlFor="content" className="text-left">
                          Content
                        </Label>
                        <Textarea
                          id="content"
                          placeholder="Type your message here."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive">Delete</Button>
              </div>
            </>
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}
