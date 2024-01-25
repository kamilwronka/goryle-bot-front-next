import { Reservation } from "@/models/reservation";
import React, { createContext, useReducer } from "react";

type Props = {
  children: React.ReactNode;
};

type ReservationsModalAction =
  | {
      type: "OPEN_EDIT";
      payload: Reservation;
    }
  | { type: "OPEN_CREATE" }
  | { type: "CLOSE" };

type ReservationsModalState = {
  isOpen: boolean;
  mode: "edit" | "create" | undefined;
  reservation?: Reservation;
};

type GuildsModalAction =
  | {
      type: "OPEN_EDIT";
      payload: Reservation;
    }
  | { type: "OPEN_CREATE" }
  | { type: "CLOSE" };

type GuildsModalState = {
  isOpen: boolean;
  mode: "edit" | "create" | undefined;
  reservation?: Reservation;
};

export type GlobalContextProviderValue = {
  reservationsModal: {
    state: ReservationsModalState;
    dispatch: React.Dispatch<ReservationsModalAction>;
  };
  guildsModal: {
    state: GuildsModalState;
    dispatch: React.Dispatch<GuildsModalAction>;
  };
};

const RESERVATIONS_MODAL_INITIAL_STATE = {
  isOpen: false,
  mode: undefined,
};

const GUILDS_MODAL_INITIAL_STATE = {
  isOpen: false,
  mode: undefined,
};

const reservationsModalReducer = (
  state: ReservationsModalState,
  action: ReservationsModalAction
): ReservationsModalState => {
  switch (action.type) {
    case "OPEN_CREATE":
      return {
        isOpen: true,
        mode: "create",
      };
    case "OPEN_EDIT":
      return {
        isOpen: true,
        mode: "edit",
        reservation: action.payload,
      };
    case "CLOSE":
      return {
        isOpen: false,
        mode: undefined,
      };
    default:
      return state;
  }
};

const guildsModalReducer = (
  state: GuildsModalState,
  action: GuildsModalAction
): GuildsModalState => {
  switch (action.type) {
    case "OPEN_CREATE":
      return {
        isOpen: true,
        mode: "create",
      };
    case "OPEN_EDIT":
      return {
        isOpen: true,
        mode: "edit",
        reservation: action.payload,
      };
    case "CLOSE":
      return {
        isOpen: false,
        mode: undefined,
      };
    default:
      return state;
  }
};

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [reservationsModalState, reservationsModalDispatch] = useReducer(
    reservationsModalReducer,
    RESERVATIONS_MODAL_INITIAL_STATE
  );
  const [guildModalState, guildModalDispatch] = useReducer(
    guildsModalReducer,
    GUILDS_MODAL_INITIAL_STATE
  );

  const value = {
    reservationsModal: {
      state: reservationsModalState,
      dispatch: reservationsModalDispatch,
    },
    guildsModal: {
      state: guildModalState,
      dispatch: guildModalDispatch,
    },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const GlobalContext = createContext<GlobalContextProviderValue>(
  {} as GlobalContextProviderValue
);
GlobalContext.displayName = "GlobalContext";
