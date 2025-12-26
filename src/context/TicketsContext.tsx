import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { getTickets as apiGetTickets, deleteTicket as apiDeleteTicket } from "../api/tickets";
import type { Ticket } from "../components/tickets";

interface State {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "LOAD_REQUEST" }
  | { type: "LOAD_SUCCESS"; payload: Ticket[] }
  | { type: "LOAD_FAILURE"; payload: string }
  | { type: "UPSERT_TICKET"; payload: Ticket }
  | { type: "REMOVE_TICKET"; payload: number };

const initialState: State = {
  tickets: [],
  loading: false,
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOAD_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOAD_SUCCESS":
      return { ...state, loading: false, tickets: action.payload };
    case "LOAD_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPSERT_TICKET": {
      const exists = state.tickets.some(t => t.id === action.payload.id);
      const tickets = exists
        ? state.tickets.map(t => (t.id === action.payload.id ? action.payload : t))
        : [action.payload, ...state.tickets];
      return { ...state, tickets };
    }
    case "REMOVE_TICKET":
      return { ...state, tickets: state.tickets.filter(t => t.id !== action.payload) };
    default:
      return state;
  }
};

interface TicketsContextType extends State {
  fetchTickets: () => Promise<void>;
  upsertTicket: (ticket: Ticket) => void;
  removeTicket: (id: number) => Promise<void>;
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTickets = useCallback(async () => {
    try {
      dispatch({ type: "LOAD_REQUEST" });
      const data = await apiGetTickets();
      dispatch({ type: "LOAD_SUCCESS", payload: data });
    } catch (err: any) {
      const message = err?.response?.data?.message || "שגיאה בטעינת נתונים";
      dispatch({ type: "LOAD_FAILURE", payload: message });
    }
  }, []);

  const upsertTicket = useCallback((ticket: Ticket) => {
    dispatch({ type: "UPSERT_TICKET", payload: ticket });
  }, []);

  const removeTicket = useCallback(async (id: number) => {
    await apiDeleteTicket(id);
    dispatch({ type: "REMOVE_TICKET", payload: id });
  }, []);

  const value = useMemo(
    () => ({
      tickets: state.tickets,
      loading: state.loading,
      error: state.error,
      fetchTickets,
      upsertTicket,
      removeTicket,
    }),
    [state.tickets, state.loading, state.error, fetchTickets, upsertTicket, removeTicket]
  );

  return (
    <TicketsContext.Provider value={value}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used within TicketsProvider");
  return ctx;
};
