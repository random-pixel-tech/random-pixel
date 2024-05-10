import "react-native-gesture-handler";
import { GluestackUIProvider, Text, Box, Center, SafeAreaView } from "@gluestack-ui/themed";
import AppNavigation from "./app/navigation/Base/AppNavigation";
import { config } from "./config/gluestack-ui.config";
import { initializeIconLibrary } from "./app/iconLibrary";
import AuthProvider from "./app/providers/Authprovider";
import { SafeAreaProvider } from "react-native-safe-area-context";

initializeIconLibrary();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GluestackUIProvider config={config}>
          <AppNavigation />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
