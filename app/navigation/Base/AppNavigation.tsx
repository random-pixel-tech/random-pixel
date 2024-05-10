import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import TabNavigator from "./TabNavigator";
import { AuthContext } from "../../providers/Authprovider";
import { Center } from "@gluestack-ui/themed";
import Auth from "../../screens/Auth";

const AppNavigation: React.FC = () => {
  const { session, isLoading } = useContext(AuthContext) ?? {};

  if (isLoading) {
    return null;
  }

  return session?.user ? (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  ) : (
    <Center>
      <Auth />
    </Center>
  );
};

export default AppNavigation;
