"use client";

import { Card } from "@/components/ui/card";
import { AddGuildCard } from "@/features/main-page/components/add-guild-card";
import { useEligibleGuilds } from "@/hooks/api/use-eligible-guilds";
import Link from "next/link";

export const UserGuilds: React.FC = () => {
  const { data } = useEligibleGuilds();

  return (
    <section className="px-8 mt-8 w-full max-w-screen-2xl">
      <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl">
        Serwery
      </h2>
      <div className="rounded-none pt-8 pb-4 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {data?.map((guild) => {
          return (
            <Link key={guild.id} href={`/guilds/${guild.id}`}>
              <Card className="min-w-48 w-48 h-28 flex justify-center items-center cursor-pointer dark:hover:bg-slate-900 hover:bg-slate-100 transition">
                {guild.name}
              </Card>
            </Link>
          );
        })}
        <AddGuildCard />
      </div>
    </section>
  );
};
