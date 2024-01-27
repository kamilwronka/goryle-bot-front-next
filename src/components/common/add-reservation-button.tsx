import { useGlobalContext } from "@/hooks/use-global-context";
import { Plus } from "lucide-react";

export const AddReservationButton: React.FC = () => {
  const {
    reservationsModal: { dispatch, state },
  } = useGlobalContext();

  const handleModalOpen = () => {
    dispatch({ type: "OPEN_CREATE" });
  };

  return (
    <div className="fixed bottom-12 right-12">
      <div
        onClick={handleModalOpen}
        className="bg-slate-900 text-slate-100 hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300  transition w-12 h-12 rounded-[50%] flex justify-center items-center border cursor-pointer"
      >
        <Plus />
      </div>
    </div>
  );
};
