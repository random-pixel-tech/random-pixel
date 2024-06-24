import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from "./Dashboard";
import { RouteNames } from '../services/utils/RouteNames';
import AttendanceStats from "../screens/controlRoom/Attendance/AttendanceStats/AttendanceStats";

const Stack = createNativeStackNavigator();

const DashNav = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.Dashboard}>
      <Stack.Screen
        name={RouteNames.Dashboard}
        component={Dashboard}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name={RouteNames.AttendanceStats}
        component={AttendanceStats}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashNav;