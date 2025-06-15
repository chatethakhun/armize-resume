import React from "react";
import { useAuth } from "@clerk/clerk-react";

interface AuthContext {
  isSignedIn: boolean;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContext>({
  isSignedIn: false,
  isLoading: true,
});
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider
      value={{ isSignedIn: auth.isSignedIn!, isLoading: !auth.isLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useMyAuth = () => React.useContext(AuthContext);
