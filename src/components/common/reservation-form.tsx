"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export const ReservationForm: React.FC = () => {
  return (
    <Drawer>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ggg</DrawerTitle>
          <DrawerDescription>xdddd</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex">
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
