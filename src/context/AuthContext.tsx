import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { getCurrentUser } from "../api/auth";

export type UserRole = "customer" | "agent" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
  created_at?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setError: (err: any) => void;
  clearError: () => void;
  setLoading: (isLoading: boolean) => void; // נוסף: פונקציה לשליטה בטעינה
}

// פונקציית עזר לתרגום שגיאות - מחוץ לקומפוננטה
const parseError = (err: any): string => {
  if (typeof err === "string") return err;
  if (err.response) return err.response.data?.message || "שגיאה מהשרת";
  if (err.request) return "אין מענה מהשרת, וודאו שהוא פועל";
  return "קרתה שגיאה בלתי צפויה";
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, loading: false, error: null };
    case "LOGOUT":
      return { ...state, user: null, loading: false, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const serverUser = await getCurrentUser();
          localStorage.setItem("user", JSON.stringify(serverUser));
          dispatch({ type: "LOGIN", payload: serverUser });
        } catch (err) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    initAuth();
  }, []);

  const login = (user: User, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const setError = (err: any) => {
    const message = parseError(err);
    dispatch({ type: "SET_ERROR", payload: message });

    // ניקוי אוטומטי של הודעת השגיאה מהסטייט אחרי 6 שניות
    setTimeout(() => {
      dispatch({ type: "CLEAR_ERROR" });
    }, 6000);
  };

  const clearError = () => dispatch({ type: "CLEAR_ERROR" });

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: isLoading });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout,
        setError,
        clearError,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};