import { createGuild } from "@/actions/create-guild";
import { Guild } from "@/models/guild";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGuild = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Guild, "_id">) => {
      const response = await createGuild(data);

      return response;
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["eligible-guilds"] });
    },
  });
};
