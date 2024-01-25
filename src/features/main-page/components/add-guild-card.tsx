"use client";

import { Card } from "@/components/ui/card";
import { useGlobalContext } from "@/hooks/use-global-context";
import { Plus } from "lucide-react";

export const AddGuildCard: React.FC = () => {
  const {
    guildsModal: { dispatch },
  } = useGlobalContext();

  const handleGuildsModalOpen = () => {
    dispatch({ type: "OPEN_CREATE" });
  };

  return (
    <Card
      onClick={handleGuildsModalOpen}
      className="w-48 min-w-48 h-28 flex justify-center items-center cursor-pointer"
    >
      <Plus />
    </Card>
  );
};
