import { fetchUserGuilds } from "@/lib/discord/fetch-user-guilds";
import { useQuery } from "@tanstack/react-query";

export const useEligibleGuilds = () => {
  return useQuery({
    queryKey: ["eligible-guilds"],
    queryFn: async () => {
      const response = await fetchUserGuilds({ eligible: true });

      return response;
    },
  });
};
