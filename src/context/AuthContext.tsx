import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, UserRole } from "../types/user";
import type { Ticket } from "../types/ticket";

interface AuthContextType {
  currentUser: User | null;
  role: UserRole | null;
  isAdmin: boolean;
  isAgent: boolean;
  isEmployee: boolean;
  login: (user: User) => void;
  logout: () => void;
  canEditTicket: (ticket: Ticket) => boolean;
  canDeleteTicket: () => boolean;
  canAssignTicket: () => boolean;
  canAddResolution: (ticket: Ticket) => boolean;
  canManageUsers: () => boolean;
  canManageCategories: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  });

  const role = currentUser?.role || null;
  const isAdmin = role === "admin";
  const isAgent = role === "support_agent";
  const isEmployee = role === "employee";

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // RBAC Permission checks per Section 2 & 25
  const canEditTicket = (ticket: Ticket): boolean => {
    if (isAdmin) return true;
    if (isAgent) return ticket.assignedAgent === currentUser?.id;
    if (isEmployee) return ticket.createdBy === currentUser?.id && ticket.status === "open";
    return false;
  };

  const canDeleteTicket = (): boolean => {
    return isAdmin;
  };

  const canAssignTicket = (): boolean => {
    return isAdmin;
  };

  const canAddResolution = (ticket: Ticket): boolean => {
    if (isAdmin) return true;
    if (isAgent) return ticket.assignedAgent === currentUser?.id;
    return false;
  };

  const canManageUsers = (): boolean => {
    return isAdmin;
  };

  const canManageCategories = (): boolean => {
    return isAdmin;
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const raw = localStorage.getItem("user");
      if (raw) {
        try {
          setCurrentUser(JSON.parse(raw));
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAdmin,
        isAgent,
        isEmployee,
        login,
        logout,
        canEditTicket,
        canDeleteTicket,
        canAssignTicket,
        canAddResolution,
        canManageUsers,
        canManageCategories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
