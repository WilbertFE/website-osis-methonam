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
import { useSession } from "next-auth/react";
import { Journal as JournalType } from "@/types/Journal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { FormEvent, useState } from "react";

type response = {
  statusCode: number;
  message: string;
};

export default function Journal({ data }: { data: JournalType }) {
  const { data: session }: any = useSession();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDelete = async () => {
    try {
      const res: response = await fetch("/api/journals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id }),
      }).then((res) => res.json());

      if (res.statusCode === 200) {
        toast(res.message);
        router.refresh();
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      console.log(error);
      toast("Failed to delete journal");
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    setIsDisabled(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const tagline = formData.get("tagline");
    const credit = formData.get("credit");
    const content = formData.get("content");

    try {
      const res: { statusCode: number; message: string } = await fetch(
        "/api/journals",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data.id,
            title,
            tagline,
            credit,
            content,
          }),
        }
      ).then((res) => res.json());
      if (res.statusCode === 200) {
        setIsDisabled(false);
        toast(res.message);
        router.refresh();
      } else {
        throw new Error("Failed! Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setIsDisabled(false);
      toast("Failed! Server error");
    }
  };
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
            {session?.user?.role === "admin" && (
              <>
                <Separator className="w-full my-4" />
                <div className="flex justify-between">
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">Edit</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit journal</DialogTitle>
                        <DialogDescription>
                          Make changes to this journal here. Click save when you
                          re done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={(e) => handleUpdate(e)}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Title
                            </Label>
                            <Input
                              id="title"
                              name="title"
                              className="col-span-3"
                              placeholder="New title"
                              defaultValue={data.title}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tagline" className="text-right">
                              Tagline
                            </Label>
                            <Input
                              id="tagline"
                              name="tagline"
                              className="col-span-3"
                              placeholder="New tagline"
                              defaultValue={data.tagline}
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="credit" className="text-right">
                              Credit
                            </Label>
                            <Input
                              id="credit"
                              name="credit"
                              className="col-span-3"
                              placeholder="New credit"
                              defaultValue={data.credit}
                            />
                          </div>

                          <div className="grid w-full gap-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                              placeholder="New content"
                              id="content"
                              name="content"
                              className="min-h-[50px]"
                              defaultValue={data.content}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={isDisabled}>
                            {isDisabled ? "Loading..." : "Save changes"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
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
