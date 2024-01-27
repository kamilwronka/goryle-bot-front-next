import { ReservationsPage } from "@/features/reservations-page/reservations-page";
import { Metadata } from "next";

type Params = {
  params: {
    id: string;
    exp: string;
  };
};

export const metadata: Metadata = {
  title: "Rezerwacje",
};

export default async function Reservations({ params: { id, exp } }: Params) {
  return <ReservationsPage id={id} exp={exp} />;
}
