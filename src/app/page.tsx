import { fetchUserReservations } from "@/app/actions/fetch-user-reservations";
import { AppNavigation } from "@/components/layout/app-navigation";
import { Card } from "@/components/ui/card";
import { fetchEligibleUserGuilds } from "@/lib/discord/fetch-eligible-user-guilds";
import { Metadata } from "next";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getServerSessionWithConfig } from "@/lib/get-server-session-with-config";
import { ReservationsTable } from "@/components/common/reservations-table";

export const metadata: Metadata = {
  title: "Exp rezerwator 3000",
  description: "Home",
};

export default async function Home() {
  const session = await getServerSessionWithConfig();
  const guilds = await fetchEligibleUserGuilds();

  const reservations = await fetchUserReservations(session?.user?.id as string);

  return (
    <main>
      <AppNavigation title={metadata.title as string} />
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-screen-2xl">
          {session && (
            <>
              <section className="px-8 mt-8 w-full max-w-screen-2xl">
                <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl">
                  Serwery
                </h2>
                <div className="rounded-none pt-8 pb-4 flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-200 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                  {guilds.map((guild) => {
                    return (
                      <Link key={guild.id} href={`/guilds/${guild.id}`}>
                        <Card className="min-w-48 w-48 h-28 flex justify-center items-center cursor-pointer dark:hover:bg-slate-900 hover:bg-slate-100 transition">
                          {guild.name}
                        </Card>
                      </Link>
                    );
                  })}
                  <Card className="w-48 min-w-48 h-28 flex justify-center items-center cursor-pointer">
                    <Plus />
                  </Card>
                </div>
              </section>
              <section className="p-8">
                <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl">
                  Twoje rezerwacje
                </h2>
                <ReservationsTable
                  reservations={reservations}
                  columns={["discord", "exp", "from", "to", "purpose"]}
                  highlightOwnRecords={false}
                />
              </section>
            </>
          )}
          {!session && (
            <section className="p-8">
              Zaloguj się, aby wyświetlić rezerwacje
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
