import 'react-native-gesture-handler';
import { GluestackUIProvider, Text, Box, Center } from '@gluestack-ui/themed';
import Auth from "./app/screens/auth/Auth";
import { useEffect, useState } from 'react';
import { supabase } from './app/services/utils/supabase';
import { Session } from '@supabase/supabase-js';
import AppNavigation from './app/navigation/Base/AppNavigation';
import { config } from "./config/gluestack-ui.config"
import { initializeIconLibrary } from './app/iconLibrary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';

initializeIconLibrary()

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
    <SafeAreaProvider>
    <GluestackUIProvider config={config}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* {session && session.user ? (
      <AppNavigation />
    ) : (
      <Center w="100%" h="100%">
        <Auth />
      </Center>
    )} */}
        <AppNavigation />
      </SafeAreaView>
    </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
