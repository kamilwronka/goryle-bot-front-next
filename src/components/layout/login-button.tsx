"use client";

import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const LoginButton = async () => {
  const session = await getServerSession();

  return session ? (
    <Button>
      <Link href="/api/auth/signin">Wyloguj się</Link>
    </Button>
  ) : (
    <Button>
      <Link href="/api/auth/signin">Zaloguj się</Link>
    </Button>
  );
};
