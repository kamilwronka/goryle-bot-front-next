import { InferSchemaType, Schema, model, models } from "mongoose";

export const reservationSchema = new Schema(
  {
    exp: { type: String, required: true },
    guildId: { type: String, required: true },
    userId: { type: String, required: true },
    purpose: { type: String, required: true },
    dateFrom: { type: Number, required: true },
    dateTo: { type: Number, required: true },
    username: { type: String, required: true },
  },
  { toJSON: { virtuals: true } }
);

export type Reservation = InferSchemaType<typeof reservationSchema> & {
  _id: string;
};

export const ReservationModel =
  models.Reservation || model<Reservation>("Reservation", reservationSchema);
