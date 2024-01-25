import { fetchReservationsData } from "@/actions/fetch-reservations-data";
import { ReservationsTab } from "@/app/guilds/[id]/components/reservations-tab";
import { AppNavigation } from "@/components/layout/app-navigation";
import { Reservation } from "@/models/reservation";
import { Metadata } from "next";

type PageProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default async function Reservations({ params: { id } }: PageProps) {
  const rawData = await fetchReservationsData(id);
  const data = JSON.parse(rawData) as Record<string, Reservation[]>;

  return (
    <div>
      <AppNavigation />
      <main className="flex flex-col items-center justify-between p-8 gap-8">
        {Object.keys(data).map((key) => {
          return <ReservationsTab key={key} expKey={key} guildId={id} />;
        })}
      </main>
    </div>
  );
}

Reservations.auth = {
  loading: "loading",
  unauthorized: "/login-with-different-user", // redirect to this url
};
