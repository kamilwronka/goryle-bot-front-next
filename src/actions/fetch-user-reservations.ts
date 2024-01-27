"use server";

import connectDB from "@/lib/db/mongo";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { ReservationModel } from "@/models/reservation";

export async function fetchUserReservations(exp?: string): Promise<string> {
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
      userId: session?.user.id,
      dateFrom: { $gte: desiredDate },
      ...(exp ? { exp } : {}),
    })
      .sort({ dateFrom: 1 })
      .lean();

    return JSON.stringify(reservations);
  } catch (error) {
    throw error;
  }
}
