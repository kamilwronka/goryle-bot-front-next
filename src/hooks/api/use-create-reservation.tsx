import { createGuild } from "@/actions/create-guild";
import { createReservation } from "@/actions/create-reservation";
import { Guild } from "@/models/guild";
import { Reservation } from "@/models/reservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReservation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Reservation, "_id">) => {
      const response = await createReservation(data);

      return response;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user-reservations"] });
    },
  });
};
