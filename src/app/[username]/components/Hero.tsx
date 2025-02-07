"use client";

import { User } from "@/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero({ user }: { user: User | null | undefined }) {
  return (
    <div className="w-full flex mt-4 flex-col px-4 items-center">
      <Avatar className="w-16 h-16">
        <AvatarImage
          alt={user?.fullname}
          src={user?.image || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>WFE</AvatarFallback>
      </Avatar>
      <div className="my-2"></div>
      <div className="text-center">
        <h1 className="font-bold text-lg tracking-wide line-clamp-1">
          {user?.fullname}
        </h1>
        <span className="line-clamp-1 text-sm">@{user?.username}</span>
      </div>
      <div className="my-2"></div>
      <div className="text-center">
        <p className="line-clamp-2 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem non
          perspiciatis eligendi pariatur ipsa dignissimos quaerat soluta
          dolorum! Architecto, repudiandae.
        </p>
      </div>
      <div className="my-2"></div>
    </div>
  );
}
