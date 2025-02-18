/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { User } from "@/types/User";
import { Loader2, MoveRight, SquareUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

type response = {
  statusCode: number;
  message: string;
};

export default function Info({ user }: { user: User }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const { data: session, update }: any = useSession();

  const updateSession = async ({
    username,
    fullname,
  }: {
    username: string;
    fullname: string;
  }) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        username,
        fullname,
      },
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const fullname = data.get("fullname");
    const bio = data.get("bio");

    try {
      const res: response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          bio,
          oldUsername: user.username,
        }),
      }).then((res) => res.json());

      if (res.statusCode === 200) {
        if (
          session.user.fullname !== fullname?.toString() ||
          session.user.username !== username?.toString()
        ) {
          await updateSession({
            username: username?.toString() || "",
            fullname: fullname?.toString() || "",
          });
        }

        if (username?.toString() !== user.username) {
          return router.push(`${username?.toString()}`);
        }
      }

      setIsDisabled(false);
      toast(res.message);
      if (res.statusCode !== 400) return router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col px-4 gap-y-2">
        <span>Profile</span>
        <div className="flex flex-col border p-3 rounded-lg">
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex gap-x-2 cursor-pointer">
                <SquareUserRound />
                <span className="flex-1 line-clamp-1">Info</span>
                <MoveRight />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[320px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Edit profilmu. Simpan perubahan jika sudah yakin.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fullname" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      className="col-span-3"
                      defaultValue={user.fullname}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      className="col-span-3"
                      defaultValue={user.username}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="bio" className="text-left">
                      Bio
                    </Label>
                    <Textarea
                      defaultValue={user.bio}
                      id="bio"
                      name="bio"
                      placeholder="Type your message here."
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isDisabled}>
                    {isDisabled ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
