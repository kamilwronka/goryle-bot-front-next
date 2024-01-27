import { metadata } from "@/app/page";
import { AppNavigation } from "@/components/layout/app-navigation";
import { PageContainer } from "@/components/ui/page-container";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
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
