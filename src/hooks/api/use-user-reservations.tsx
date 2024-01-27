import { fetchUserReservations } from "@/actions/fetch-user-reservations";
import { Reservation } from "@/models/reservation";
import { useQuery } from "@tanstack/react-query";

export const useUserReservations = () => {
  return useQuery({
    queryKey: ["user-reservations"],
    queryFn: async () => {
      const response = await fetchUserReservations();

      return JSON.parse(response) as unknown as Reservation[];
    },
  });
};
