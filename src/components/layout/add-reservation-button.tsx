"use client";

import { ReservationForm } from "@/components/common/reservation-form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";

export const AddReservationButton = () => {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger>
        <div className="fixed bottom-12 right-12">
          <div className="bg-slate-900 text-slate-100 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300  transition w-12 h-12 rounded-[50%] flex justify-center items-center border cursor-pointer">
            <Plus />
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-8 pb-8">
        <DrawerHeader>
          <DrawerTitle>
            Tworzenie nowej rezerwacji - jeszcze nic nie robi
          </DrawerTitle>
        </DrawerHeader>
        <ReservationForm />
        <DrawerFooter className="p-0 flex flex-row items-center w-full justify-center mt-8">
          <DrawerClose asChild>
            <Button className="w-36" variant="outline">
              Anuluj
            </Button>
          </DrawerClose>
          <Button className="w-36">Utwórz</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
