"use server";

import { EXP_SORT_ORDER } from "@/config/exp-sort-order";
import { MAXIMUM_RESERVATION_DURATION } from "@/config/reservations";
import connectDB from "@/lib/db/mongo";
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

    const sortedReservations = reservations.sort(
      (a, b) => EXP_SORT_ORDER.indexOf(a.exp) - EXP_SORT_ORDER.indexOf(b.exp)
    );

    if (exp) {
      return JSON.stringify(sortedReservations);
    }

    const groups = groupBy(sortedReservations, "exp");

    return JSON.stringify(groups);
  } catch (error) {
    throw error;
  }
}
