"use client";

import { ReservationsTable } from "@/components/common/reservations-table";
import { useGuildReservations } from "@/hooks/api/use-guild-reservations";

type Props = {
  id: string;
  exp: string;
};

export const GuildReservations: React.FC<Props> = ({ exp, id }) => {
  const expName = decodeURIComponent(exp);
  const {
    data: guildReservations,
    isLoading,
    isFetched,
  } = useGuildReservations(id, expName);

  return (
    <div className="row p-8 w-full max-w-screen-2xl flex flex-col">
      <div className="w-full">
        <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-2xl">
          {expName}
        </h2>
      </div>
      <div className="w-full">
        <ReservationsTable
          reservations={guildReservations}
          columns={["username", "from", "to", "purpose"]}
          highlightOwnRecords
          isLoading={isLoading && !isFetched}
        />
      </div>
    </div>
  );
};
