"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import { Trash } from "lucide-react";

type Props = {
  id: string;
  onDelete: (id: string) => void;
};

export const DeleteReservationButton: React.FC<Props> = ({ id, onDelete }) => {
  const handleReservationDelete = () => {
    onDelete(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ButtonWithTooltip
          variant="outline"
          size="icon"
          tooltipDelay={100}
          tooltipContent="Usuń"
        >
          <Trash className="text-red-500 w-4 h-4" />
        </ButtonWithTooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć tą rezerwację?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleReservationDelete}>
            Usuń
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
