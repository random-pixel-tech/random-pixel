import 'react-native-gesture-handler';
import { GluestackUIProvider, Text, Box, Center } from '@gluestack-ui/themed';
import Auth from './app/screens/Auth';
import HomePage from './app/screens/HomePage';
import { useEffect, useState } from 'react';
import { supabase } from './app/utils/supabase';
import { Session } from '@supabase/supabase-js';
import AppNavigation from './app/navigation/Navigation';
// import MyTabs from './navigation/MyTabs';
import { config } from "./config/gluestack-ui.config"


export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <GluestackUIProvider config={config}>
    {session && session.user ? (
      <AppNavigation />
    ) : (
      <Center w="100%" h="100%">
        <Auth />
      </Center>
    )}
  </GluestackUIProvider>
  );
}
