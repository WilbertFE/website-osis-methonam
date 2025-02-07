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

export default function Journal() {
  return (
    <>
      <Card className="w-[320px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Journal One</CardTitle>
              <CardDescription>Valentine Days</CardDescription>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>WFE</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <Separator className="mb-3" />
        <CardContent>
          <p className="line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro enim
            accusantium, praesentium earum iure mollitia voluptate dicta sed
            architecto ipsam.
          </p>
        </CardContent>
        <Separator className="mb-3" />
        <CardFooter>
          <Sheet>
            <div className="flex justify-between w-full">
              <Button asChild>
                <SheetTrigger>Detail</SheetTrigger>
              </Button>
              <Badge variant="outline">Cr: Tia & Nesya</Badge>
            </div>
            <SheetContent className="w-full max-w-full flex flex-col">
              <SheetHeader className="mt-12 flex-1">
                <SheetTitle>Valentine Days</SheetTitle>
                <SheetDescription className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  in totam labore iure repellendus nostrum hic quos eum
                  consequuntur quaerat, eos praesentium veniam sequi accusamus
                  pariatur explicabo provident enim et adipisci repudiandae
                  ullam nemo eaque. Neque reiciendis voluptate, dolore odio
                  itaque beatae optio dolores doloremque, magni corrupti culpa
                  veniam? Totam?
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <Button variant="destructive" asChild className="">
                  <SheetClose>Tutup</SheetClose>
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </CardFooter>
      </Card>
    </>
  );
}
