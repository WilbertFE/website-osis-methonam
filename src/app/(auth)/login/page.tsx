/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Dialog defaultOpen={true}>
        <Button asChild>
          <DialogTrigger>Login</DialogTrigger>
        </Button>
        <DialogContent className="max-w-[320px]">
          <DialogHeader>
            <div className="flex items-start">
              <div className="text-left flex-1">
                <DialogTitle>Login</DialogTitle>
                <div className="my-1"></div>
                <DialogDescription>
                  Login ke aplikasi web OSIS METHONAM.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
            <FaGoogle /> Login with google
          </Button>
          <DialogFooter>
            <div className="text-center">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 inline-block">
                Register
              </Link>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
