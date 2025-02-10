/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import Image from "next/image";
import IconSIKAT from "/public/img/logo.png";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  {
    label: "Beranda",
    href: "/",
  },
];

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status, data: session }: any = useSession();

  console.log("sesssion: ", session);

  console.log(status);

  if (status === "loading") return null;

  return (
    <Navbar
      shouldHideOnScroll
      className="dark:bg-transparent z-[999]"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Navbar mobile */}
      <NavbarContent justify="start">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={session.user.image || "https://github.com/shadcn.png"}
                  alt={session.user.fullname}
                />
                <AvatarFallback>WFE</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[9999]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {status === "authenticated" ? (
                <>
                  <DropdownMenuItem>
                    <Link
                      href={`/${session.user.username || ""}`}
                      className="w-full h-full cursor-pointer"
                    >
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-red-600 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavbarItem>
      </NavbarContent>
      {/* Navbar Mobile Icon */}
      <NavbarContent className="sm:hidden pr-3 -mr-8" justify="center">
        <NavbarBrand>
          <Image src={IconSIKAT} alt="icon" height={128} width={128} />
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar Tablet - Laptop */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Image src={IconSIKAT} alt="icon" height={32} width={32} />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Navbar - Mobile */}
      <NavbarMenu className="dark:bg-transparent z-[999]">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="w-full"
              color="foreground"
              href={item.href || ""}
            >
              {item.label}
            </Link>
            <div className="my-2"></div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
