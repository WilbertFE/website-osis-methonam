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
// import { useState } from "react";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getUserByEmail } from "@/lib/firebase/service";

export default function Info({ user }: { user: User }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [myData, setMyData] = useState<User | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session.user) {
      const getUserAsync = async () => {
        const user = await getUserByEmail(session.user.email);
        setMyData(user);
      };
      getUserAsync();
    }
  }, [session, status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);

    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const fullname = data.get("fullname");
    const bio = data.get("bio");

    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          username,
          bio,
          oldUsername: myData?.username,
        }),
      }).then((res) => res.json());

      if (res.statusCode === 200) {
        if (res.newUsername !== myData?.username) {
          router.push(`${res.newUsername}`);
        } else {
          router.refresh();
        }
      }

      setIsDisabled(false);
      toast(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user.username === myData?.username && (
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
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="bio" className="text-right">
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
      )}
    </>
  );
}
