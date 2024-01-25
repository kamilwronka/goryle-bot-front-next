"use server";

import connectDB from "@/lib/db/mongo";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { parseTimestampToDate } from "@/lib/parse-timestamp-to-date";
import { ReservationModel } from "@/models/reservation";

export async function fetchUserReservations(
  id: string,
  exp?: string
): Promise<string> {
  const session = await getServerSessionWithConfig();

  if (!session) {
    // @ts-ignore
    return "[]";
    // throw new Error("No session");
  }

  try {
    await connectDB();

    const now = Date.now();
    const desiredDate = now - 1000 * 60 * 60 * 3;

    const reservations = await ReservationModel.find({
      userId: id,
      dateFrom: { $gte: desiredDate },
      ...(exp ? { exp } : {}),
    })
      .sort({ dateFrom: 1 })
      .lean();

    const parsedResult = reservations.map((reservation) => {
      const from = parseTimestampToDate(reservation.dateFrom);
      const to = parseTimestampToDate(reservation.dateTo);

      return {
        ...reservation,
        dateFrom: from,
        dateTo: to,
      };
    });

    return JSON.stringify(parsedResult);
  } catch (error) {
    throw error;
  }
}
