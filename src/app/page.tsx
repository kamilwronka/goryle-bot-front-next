import { fetchUserReservations } from "@/app/actions/fetch-user-reservations";
import { AppNavigation } from "@/components/layout/app-navigation";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchEligibleUserGuilds } from "@/lib/discord/fetch-eligible-user-guilds";
import { Metadata } from "next";
import { DeleteReservationButton } from "@/components/common/delete-reservation-button";
import { EditReservationButton } from "@/components/common/edit-reservation-button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getServerSessionWithConfig } from "@/lib/get-server-session-with-config";

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
      {session && (
        <>
          <section className="px-8 mt-8 w-[100vw]">
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
              Rezerwacje
            </h2>
            <Table className="mt-8 border">
              <TableHeader>
                <TableRow className="bg-secondary">
                  <TableHead className="w-36 min-w-24">Discord</TableHead>
                  <TableHead className="w-36 min-w-24">Użytkownik</TableHead>
                  <TableHead className="w-36 min-w-24">Exp</TableHead>
                  <TableHead className="w-48 min-w-48">Od</TableHead>
                  <TableHead className="w-48 min-w-48">Do</TableHead>
                  <TableHead className="w-36 min-w-24">Cel</TableHead>
                  <TableHead className="w-36 min-w-24"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Brak rezerwacji
                    </TableCell>
                  </TableRow>
                )}
                {reservations.length > 0 &&
                  reservations.map(
                    ({
                      _id,
                      dateFrom,
                      dateTo,
                      objective,
                      guildId,
                      username,
                      exp,
                    }) => {
                      return (
                        <TableRow key={_id}>
                          <TableCell>{guildId}</TableCell>
                          <TableCell>{username}</TableCell>
                          <TableCell>{exp}</TableCell>
                          <TableCell>{dateFrom}</TableCell>
                          <TableCell>{dateTo}</TableCell>
                          <TableCell>{objective}</TableCell>
                          <TableCell className="flex gap-2 justify-end">
                            <EditReservationButton id={_id} />
                            <DeleteReservationButton id={_id} />
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
          </section>
        </>
      )}
      {!session && (
        <section className="p-8">
          Zaloguj się, aby wyświetlić rezerwacje
        </section>
      )}
    </main>
  );
}
