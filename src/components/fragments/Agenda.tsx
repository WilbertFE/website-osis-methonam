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

export default function Agenda({ data }: { data: AgendaType }) {
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
      </CardFooter>
    </Card>
  );
}
