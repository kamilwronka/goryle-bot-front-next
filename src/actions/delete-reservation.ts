"use server";

import connectDB from "@/lib/db/mongo";
import { getServerSessionWithConfig } from "@/lib/auth/get-server-session-with-config";
import { ReservationModel } from "@/models/reservation";
import { ObjectId } from "mongodb";

export async function deleteReservation(id: string): Promise<string> {
  try {
    const session = await getServerSessionWithConfig();

    if (!session) {
      throw new Error("No session");
    }

    await connectDB();

    const result = await ReservationModel.deleteOne({
      _id: new ObjectId(id),
      userId: session?.user?.id,
    });

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
