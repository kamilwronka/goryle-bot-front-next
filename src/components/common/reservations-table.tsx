"use client";

import { deleteReservation } from "@/actions/delete-reservation";
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
import { cn } from "@/lib/utils";
import { Reservation } from "@/models/reservation";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Column = "discord" | "exp" | "from" | "to" | "purpose" | "username";

type Props = {
  reservations: Reservation[];
  columns: Column[];
  highlightOwnRecords: boolean;
};

export const ReservationsTable: React.FC<Props> = ({
  reservations,
  columns,
  highlightOwnRecords = false,
}) => {
  const { data: session } = useSession();
  const [optimisticReservations, setOptimisticReservations] =
    useState<Reservation[]>(reservations);

  const handleReservationDelete = async (id: string) => {
    setOptimisticReservations((prev) => {
      return prev.filter((reservation) => reservation._id !== id);
    });

    await deleteReservation(id);
  };

  console.log(reservations);

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
        return <TableCell key={column}>{guildId}</TableCell>;
      case "exp":
        return <TableCell key={column}>{exp}</TableCell>;
      case "from":
        return <TableCell key={column}>{dateFrom}</TableCell>;
      case "to":
        return <TableCell key={column}>{dateTo}</TableCell>;
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
        {optimisticReservations.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Brak rezerwacji
            </TableCell>
          </TableRow>
        )}
        {optimisticReservations.length > 0 &&
          optimisticReservations.map((reservation) => {
            return (
              <TableRow
                key={reservation._id}
                className={cn({
                  "bg-slate-900":
                    // @ts-ignore
                    session?.user.id === reservation.userId &&
                    highlightOwnRecords,
                })}
              >
                {columns.map((column) => renderRow(column, reservation))}
                <TableCell className="flex gap-2 justify-end h-[72px]">
                  {/* @ts-ignore */}
                  {session?.user.id === reservation.userId && (
                    <>
                      <EditReservationButton id={reservation._id} />
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
