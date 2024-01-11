import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      yuriko pedał
    </main>
  );
}
