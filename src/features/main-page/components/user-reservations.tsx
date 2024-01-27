"use client";

import { ReservationsTable } from "@/components/common/reservations-table";
import { useUserReservations } from "@/hooks/api/use-user-reservations";

export const UserReservations: React.FC = () => {
  const { data: reservations } = useUserReservations();

  return (
    <section className="p-8">
      <h2 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-xl">
        Twoje rezerwacje
      </h2>
      <ReservationsTable
        reservations={reservations}
        columns={["discord", "exp", "from", "to", "purpose"]}
        highlightOwnRecords={false}
        enableNavigation
      />
    </section>
  );
};
