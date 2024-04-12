import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/DashboardScreen/Dashboard';
import AttendanceStats from '../screens/DashboardScreen/AttendanceStats';
import { RouteNames } from '../services/utils/RouteNames';

const Stack = createNativeStackNavigator();

const DashboardNav = () => {
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
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNav;