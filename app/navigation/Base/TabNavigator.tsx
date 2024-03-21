import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Conversation from '../../screens/Conversation';
import Dashboard from '../../screens/Dashboard';
import ControlRoom from '../../screens/ControlRoom/ControlRoom';
import HomePage from '../../screens/HomePage';
import { Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import Profile from '../../screens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
    return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#5f31dd'
            }}
           >
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Entypo name="home" size={focused ? 23 : 20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Conversation"
                    component={Conversation}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Entypo name="chat" size={focused ? 23 : 20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Control Room"
                    component={ControlRoom}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name="book" size={focused ? 23 : 20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialIcons name="dashboard" size={focused ? 23 : 20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: () => (
                            <Avatar size="xs" rounded="$full">
                                <AvatarFallbackText>Anukrati Mehta</AvatarFallbackText>
                            </Avatar>
                        ),
                    }}
                />
            </Tab.Navigator>
    );
};

export default TabNavigator;
