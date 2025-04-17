/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Journal as JournalType } from "@/types/Journal";

export default function Journal({ data }: { data: JournalType }) {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{data.title}</CardTitle>
            <CardDescription>{data.tagline}</CardDescription>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>WFE</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <Separator className="mb-3" />
      <CardContent>
        <p className="line-clamp-3">{data.content}</p>
      </CardContent>
      <Separator className="mb-3" />
      <CardFooter>
        <Sheet>
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <Button asChild>
                <SheetTrigger>Detail</SheetTrigger>
              </Button>
              <Badge variant="outline">Cr: {data.credit}</Badge>
            </div>
          </div>
          <SheetContent className="w-full max-w-full flex flex-col z-[1000]">
            <SheetHeader className="flex-1">
              <SheetTitle>{data.title}</SheetTitle>
              <SheetDescription className="text-justify">
                {data.content}
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <Button variant="destructive" asChild className="">
                <SheetClose>Close</SheetClose>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardFooter>
    </Card>
  );
}
