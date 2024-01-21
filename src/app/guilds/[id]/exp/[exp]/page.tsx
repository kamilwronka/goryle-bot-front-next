import {
  Reservation,
  fetchReservationsData,
} from "@/app/actions/fetch-reservations-data";
import { Timetable } from "@/app/guilds/[id]/exp/[exp]/components/timetable";
import { AppNavigation } from "@/components/layout/app-navigation";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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
      <div className="row items-center justify-start p-8">
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
          {expName}
        </h2>
        <div className="mt-8">
          <Timetable data={data[expName]} name={expName} />
        </div>
      </div>
    </main>
  );
}
