"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Settings() {
  return (
    <>
      <div className="w-full flex flex-col px-4 gap-y-2">
        <span>Settings</span>
        <div className="flex flex-col border p-3 rounded-lg">
          <div
            className="flex gap-x-2 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut color="#ff0000" />
            <span className="flex-1 line-clamp-1 text-red-600">Log out</span>
          </div>
        </div>
      </div>
    </>
  );
}
