import {
  Reservation,
  fetchReservationsData,
} from "@/app/actions/fetch-reservations-data";
import { Timetable } from "@/app/reservations/[id]/exp/[exp]/components/timetable";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
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
    <main className="flex flex-col items-center justify-between p-12 gap-12">
      <div className="flex row items-center justify-start gap-4">
        <Link href={`/reservations/${id}`}>
          <ArrowLeft className="mt-1" />
        </Link>
        <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          {expName}
        </h2>
      </div>
      <Timetable data={data[expName]} name={expName} />
    </main>
  );
}
