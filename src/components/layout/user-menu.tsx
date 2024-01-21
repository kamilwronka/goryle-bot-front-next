"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, ArrowDown, LogOut, PlusIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const UserMenu = () => {
  const { data: sessionData, status } = useSession();

  return (
    <>
      {status === "authenticated" && (
        // <Button onClick={() => signOut()}>Wyloguj się</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer h-10 w-10">
              <AvatarImage src={sessionData.user?.image as string} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-16 py-4">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                {sessionData.user?.name}
              </p>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700"></div>
            <div className="py-4 text-center">
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Dodaj serwer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {status === "unauthenticated" && (
        <Button onClick={() => signIn()}>Zaloguj się</Button>
      )}
      {status === "loading" && (
        <Avatar className="cursor-pointer h-10 w-10">
          <AvatarImage src={undefined} />
          <AvatarFallback>
            <Loader2 className="h-4 w-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      )}
    </>
  );
};
