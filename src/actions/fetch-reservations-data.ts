"use server";

import { EXP_SORT_ORDER } from "@/config/exp-sort-order";
import { MAXIMUM_RESERVATION_DURATION } from "@/config/reservations";
import connectDB from "@/lib/db/mongo";
import { parseTimestampToDate } from "@/lib/parse-timestamp-to-date";
import { Reservation, ReservationModel } from "@/models/reservation";
import { groupBy } from "lodash";

export async function fetchReservationsData(
  id: string,
  exp?: string
): Promise<string> {
  try {
    await connectDB();
    const now = Date.now();

    const desiredDate = now - MAXIMUM_RESERVATION_DURATION;

    const reservations = (await ReservationModel.find({
      guildId: id,
      dateFrom: { $gte: desiredDate },
      ...(exp ? { exp } : {}),
    }).lean()) as Reservation[];

    const parsedResult = reservations.map((reservation) => {
      const from = parseTimestampToDate(reservation.dateFrom);
      const to = parseTimestampToDate(reservation.dateTo);

      return {
        ...reservation,
        dateFrom: from,
        dateTo: to,
      };
    });

    const sortedReservations = parsedResult.sort(
      (a, b) => EXP_SORT_ORDER.indexOf(a.exp) - EXP_SORT_ORDER.indexOf(b.exp)
    );
    const groups = groupBy(sortedReservations, "exp");

    return JSON.stringify(groups);
  } catch (error) {
    throw error;
  }
}
