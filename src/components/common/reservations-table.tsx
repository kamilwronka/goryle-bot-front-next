"use client";

import { DeleteReservationButton } from "@/components/common/delete-reservation-button";
import { EditReservationButton } from "@/components/common/edit-reservation-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteReservation } from "@/hooks/api/use-delete-reservation";
import { useEligibleGuilds } from "@/hooks/api/use-eligible-guilds";
import { parseTimestampToDate } from "@/lib/parse-timestamp-to-date";
import { cn } from "@/lib/utils";
import { Reservation } from "@/models/reservation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Column = "discord" | "exp" | "from" | "to" | "purpose" | "username";

type Props = {
  reservations?: Reservation[];
  columns: Column[];
  highlightOwnRecords: boolean;
  enableNavigation?: boolean;
};

export const ReservationsTable: React.FC<Props> = ({
  reservations = [],
  columns,
  highlightOwnRecords = false,
  enableNavigation = false,
}) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const { mutate: deleteReservationMutate } = useDeleteReservation();
  const { data: eligibleGuilds } = useEligibleGuilds();
  const router = useRouter();

  const handleReservationDelete = async (id: string) => {
    deleteReservationMutate(id, {
      onSuccess: () => {
        toast({ title: "Rezerwacja została usunięta" });
      },
    });
  };

  const handleNavigate = (reservation: Reservation) => {
    enableNavigation &&
      router.push(
        `/guilds/${reservation.guildId}/exp/${reservation.exp}#reservation-${reservation._id}`
      );
  };

  const renderHead = (column: Column) => {
    switch (column) {
      case "discord":
        return (
          <TableHead key={column} className="w-36 min-w-24">
            Discord
          </TableHead>
        );
      case "exp":
        return (
          <TableHead key={column} className="w-36 min-w-24">
            Exp
          </TableHead>
        );
      case "from":
        return (
          <TableHead key={column} className="w-48 min-w-48">
            Od
          </TableHead>
        );
      case "to":
        return (
          <TableHead key={column} className="w-48 min-w-48">
            Do
          </TableHead>
        );
      case "purpose":
        return (
          <TableHead key={column} className="w-36 min-w-24">
            Cel
          </TableHead>
        );
      case "username":
        return (
          <TableHead key={column} className="w-36 min-w-24">
            Użytkownik
          </TableHead>
        );
      default:
        return null;
    }
  };

  const renderRow = (column: Column, reservation: Reservation) => {
    const { guildId, exp, dateFrom, dateTo, purpose, username } = reservation;

    switch (column) {
      case "discord":
        const guild = eligibleGuilds?.find((item) => item.id === guildId);
        return <TableCell key={column}>{guild?.name || guildId}</TableCell>;
      case "exp":
        return <TableCell key={column}>{exp}</TableCell>;
      case "from":
        const from = parseTimestampToDate(dateFrom);
        return <TableCell key={column}>{from}</TableCell>;
      case "to":
        const to = parseTimestampToDate(dateTo);
        return <TableCell key={column}>{to}</TableCell>;
      case "purpose":
        return <TableCell key={column}>{purpose}</TableCell>;
      case "username":
        return <TableCell key={column}>{username}</TableCell>;
      default:
        return null;
    }
  };

  return (
    <Table className="mt-8 border">
      <TableHeader>
        <TableRow className="bg-secondary">
          {columns.map((column) => renderHead(column))}
          <TableHead className="w-36 min-w-24"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center h-[72px]">
              Brak rezerwacji
            </TableCell>
          </TableRow>
        )}
        {reservations.length > 0 &&
          reservations.map((reservation) => {
            return (
              <TableRow
                key={reservation._id}
                className={cn({
                  "bg-slate-900":
                    // @ts-ignore
                    session?.user.id === reservation.userId &&
                    highlightOwnRecords,
                  "cursor-pointer": enableNavigation,
                })}
                onClick={() => handleNavigate(reservation)}
                id={`reservation-${reservation._id}`}
              >
                {columns.map((column) => renderRow(column, reservation))}
                <TableCell className="flex gap-2 justify-end h-[72px]">
                  {/* @ts-ignore */}
                  {session?.user.id === reservation.userId && (
                    <>
                      <EditReservationButton data={reservation} />
                      <DeleteReservationButton
                        id={reservation._id}
                        onDelete={handleReservationDelete}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};
