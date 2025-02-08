/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export default function Admin() {
  return (
    <>
      <div className="w-full flex flex-col px-4 gap-y-2">
        <span>Admin</span>
        <div className="flex flex-col border p-3 rounded-lg">
          <div className="flex gap-x-2 cursor-pointer">
            <span className="flex-1 line-clamp-1 text-red-600">Posts</span>
          </div>
        </div>
      </div>
    </>
  );
}
