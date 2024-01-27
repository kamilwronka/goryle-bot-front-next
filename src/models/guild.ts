import { InferSchemaType, Schema, model, models } from "mongoose";

export const guildSchema = new Schema(
  {
    guildId: { type: String, required: true },
    roleId: { type: String, required: true },
  },
  { toJSON: { virtuals: true } }
);

export type Guild = InferSchemaType<typeof guildSchema> & { _id: string };

export const GuildModel = models.Guild || model<Guild>("Guild", guildSchema);
