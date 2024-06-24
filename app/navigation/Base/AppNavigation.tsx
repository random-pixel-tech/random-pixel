import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ControlRoomNav from "../ControlRoomNav";

const Stack = createNativeStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <ControlRoomNav />
    </NavigationContainer>
  );
};

export default AppNavigation;
