import { fetchUserReservations } from "@/actions/fetch-user-reservations";
import { metadata } from "@/app/page";
import { ReservationsTable } from "@/components/common/reservations-table";
import { AppNavigation } from "@/components/layout/app-navigation";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/page-container";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import Link from "next/link";
import { Reservation } from "@/models/reservation";
import { fetchUserGuilds } from "@/lib/discord/fetch-user-guilds";
import { AddGuildCard } from "@/features/main-page/components/add-guild-card";
import { UserGuilds } from "@/features/main-page/components/user-guilds";
import { UserReservations } from "@/features/main-page/components/user-reservations";

export const MainPage = async () => {
  const session = await getServerSessionWithConfig();

  return (
    <main>
      <AppNavigation title={metadata.title as string} />
      <PageContainer>
        {session && (
          <>
            <UserGuilds />
            <UserReservations />
          </>
        )}
        {!session && (
          <section className="p-8">
            Zaloguj się, aby wyświetlić rezerwacje
          </section>
        )}
      </PageContainer>
    </main>
  );
};
