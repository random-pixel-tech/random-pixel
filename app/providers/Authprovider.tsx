import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../services/utils/supabase";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext<{
  session: Session | null;
  isLoading: boolean;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Specify children prop type
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // console.log("getting session: ", session);
      setIsLoading(false);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("session changed: ", session);
      if (session) {
        const jwt = jwtDecode(session.access_token);
        console.log(JSON.stringify(jwt, null, 2));
      }
      setIsLoading(false);
      setSession(session);
    });
  }, []);

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
