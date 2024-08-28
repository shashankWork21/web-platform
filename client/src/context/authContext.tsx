"use client";

import { validateSessionUrl } from "@/utils/paths";
import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

interface UserProviderChildren {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: any;
  setUser: any;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => null,
  loading: false,
});

export const UserProvider = ({ children }: UserProviderChildren) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const validateUser = useCallback(async () => {
    setLoading(true);
    try {
      const validationResult = await axios.get(validateSessionUrl(), {
        withCredentials: true,
      });
      setUser(validationResult.data.user);
      setLoading(false);
    } catch (error) {
      setUser({});
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
