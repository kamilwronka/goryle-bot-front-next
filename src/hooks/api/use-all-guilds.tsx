import { fetchUserGuilds } from "@/lib/discord/fetch-user-guilds";
import { useQuery } from "@tanstack/react-query";

export const useAllGuilds = () => {
  return useQuery({
    queryKey: ["all-guilds"],
    queryFn: async () => {
      const response = await fetchUserGuilds({ eligible: false });

      return response;
    },
  });
};
