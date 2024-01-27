import { deleteReservation } from "@/actions/delete-reservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReservation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteReservation(id);

      return response;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user-reservations"] });
    },
  });
};
