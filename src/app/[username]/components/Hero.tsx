"use client";

import { User } from "@/types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero({ user }: { user: User }) {
  return (
    <div className="w-full flex pt-24 flex-col px-4 items-center">
      <Avatar className="w-16 h-16">
        <AvatarImage alt={user.fullname} src={user.image} />
        <AvatarFallback>WFE</AvatarFallback>
      </Avatar>
      <div className="my-2"></div>
      <div className="text-center">
        <h1 className="font-bold text-lg tracking-wide line-clamp-1">
          {user.fullname}
        </h1>
        <span className="line-clamp-1 text-sm">@{user.username}</span>
      </div>
      <div className="my-2"></div>
      <div className="text-center">
        <p className="line-clamp-2 text-sm">{user.bio}</p>
      </div>
      <div className="my-2"></div>
    </div>
  );
}
