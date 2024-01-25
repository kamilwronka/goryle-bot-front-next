"use client";

import { ReservationForm } from "@/components/common/reservation-form";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useGlobalContext } from "@/hooks/use-global-context";
import { GuildForm } from "@/components/common/guild-form";

export const GuildModal = () => {
  const {
    guildsModal: { state, dispatch },
  } = useGlobalContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClose = () => {
    dispatch({ type: "CLOSE" });
  };

  const title =
    state.mode === "create" ? "Dodawanie serwera" : "Edycja serwera";

  if (isDesktop) {
    return (
      <Dialog open={state.isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <GuildForm onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={state.isOpen} onClose={handleClose}>
      <DrawerContent className="px-8 pb-8">
        <div className="flex justify-center pt-8 pb-4">
          <DrawerTitle>{title}</DrawerTitle>
        </div>
        <ReservationForm onCancel={handleClose} />
      </DrawerContent>
    </Drawer>
  );
};
