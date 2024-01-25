import { fetchReservationsData } from "@/actions/fetch-reservations-data";
import { ReservationsTable } from "@/components/common/reservations-table";
import { AppNavigation } from "@/components/layout/app-navigation";
import { Reservation } from "@/models/reservation";
import { Metadata } from "next";

type Params = {
  params: {
    id: string;
    exp: string;
  };
};

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export default async function Reservations({ params: { id, exp } }: Params) {
  const expName = decodeURIComponent(exp);
  const rawData = await fetchReservationsData(id, expName);
  const data = JSON.parse(rawData) as Record<string, Reservation[]>;

  return (
    <main>
      <AppNavigation title={metadata.title as string} />
      <div className="flex items-center justify-center w-full">
        <div className="row p-8 w-full max-w-screen-2xl flex flex-col">
          <div className="w-full">
            <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
              {expName}
            </h2>
          </div>
          <div className="w-full">
            <ReservationsTable
              reservations={data[expName]}
              columns={["username", "from", "to", "purpose"]}
              highlightOwnRecords
            />
          </div>
        </div>
      </div>
    </main>
  );
}
