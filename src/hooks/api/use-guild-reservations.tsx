import { fetchReservationsData } from "@/actions/fetch-reservations-data";
import { Reservation } from "@/models/reservation";
import { useQuery } from "@tanstack/react-query";

export const useGuildReservations = (id: string, expName?: string) => {
  return useQuery({
    queryKey: ["guild-reservations", id, expName],
    queryFn: async () => {
      const response = await fetchReservationsData(id, expName);

      return JSON.parse(response) as unknown as Reservation[];
    },
  });
};
