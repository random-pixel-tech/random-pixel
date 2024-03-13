import React from 'react';
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer';
import { Entypo, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import CustomDrawerContent from './CustomDrawerContent';
import HomePage from '../screens/HomePage';
import Conversation from '../screens/Conversation';
import Dashboard from '../screens/Dashboard';
import ControlRoom from '../screens/ControlRoom';
import Settings from '../screens/Settings';

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@gluestack-ui/themed';
import ProfileAvatar from '../components/Avatar';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Attendance"
      screenOptions={{
        drawerPosition: 'right',
        headerLeft: () => null,
        headerRight: () => <ProfileAvatar />,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomePage}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="user-check" size={20} color={color} style={{ marginRight: -22 }} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Conversation"
        component={Conversation}
        options={{
          drawerIcon: ({ color }) => (
            <Entypo name="chat" size={20} color={color} style={{ marginRight: -22 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={20} color={color} style={{ marginRight: -22 }} />
          ),
        }}
      />
      <Drawer.Screen
        name="Control Room"
        component={ControlRoom}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="book" size={20} color={color} style={{ marginRight: -22 }} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" size={20} color={color} style={{ marginRight: -22 }} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
