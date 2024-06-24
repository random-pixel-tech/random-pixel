import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from "../../screens/settings/Settings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ControlRoomNav from "../ControlRoomNav";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../services/utils/RouteNames";
import ControlRoom from "../../screens/controlRoom/ControlRoom";

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#5f31dd",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingHorizontal: 0,
        },
        headerShown: false,
      }}
    >
      {/* <Tab.Screen
               name="Home"
               component={HomePage}
               options={{
                   tabBarIcon: ({ color, focused }) => (
                       <FontAwesomeIcon icon="house" size={focused ? 24 : 20} color={color} />
                   ),
               }}
           />
            */}
      <Tab.Screen
        name="Home"
        component={ControlRoom}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon
              icon="house"
              size={focused ? 24 : 20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesomeIcon
              icon="gear"
              size={focused ? 24 : 20}
              color={color}
              style={{ marginRight: 10 }}
            />
          ),
          tabBarLabelStyle: { marginRight: 10 },
        }}
      />
      {/* <Tab.Screen
               name="Dashboard"
               component={DashNav}
               options={{
                   tabBarIcon: ({ color, focused }) => (
                       <FontAwesomeIcon
                           icon="chart-simple"
                           size={focused ? 24 : 20}
                           color={color}
                           style={{ marginLeft: 10 }}
                       />
                   ),
                   headerShown: false,
                   tabBarLabelStyle: { marginLeft: 10 },
               }}
               listeners={({ navigation }) => ({
                   tabPress: (e) => {
                       e.preventDefault();
                       navigation.navigate('Dashboard', { screen: RouteNames.Dashboard });
                   },
               })}
           /> */}
      {/* <Tab.Screen
               name="Profile"
               component={Profile}
               options={{
                   tabBarIcon: () => (
                       <Avatar size="xs" rounded="$full">
                           <AvatarFallbackText>Anukrati Mehta</AvatarFallbackText>
                       </Avatar>
                   ),
               }}
           /> */}
    </Tab.Navigator>
  );
};


export default TabNavigator;
