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

export default function Agenda() {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Sabtu</CardTitle>
        <CardDescription>14 Febuari 2025</CardDescription>
        <CardTitle>Valentine Days</CardTitle>
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
              <DrawerTitle>Valentine Days</DrawerTitle>
              <DrawerDescription>Sabtu, 14 Febuari 2025</DrawerDescription>
              <DrawerDescription className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                sint debitis cumque suscipit, libero asperiores ipsa consectetur
                hic id! Cupiditate velit, doloremque deserunt earum laboriosam
                voluptatibus libero facere accusantium sequi? Tempore totam
                sequi, sint, eaque ipsum exercitationem sit veniam molestias at,
                maxime commodi quis quibusdam porro voluptatem ullam? Accusamus,
                amet.
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
