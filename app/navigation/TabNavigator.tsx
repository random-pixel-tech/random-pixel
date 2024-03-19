import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Conversation from '../screens/Conversation';
import Dashboard from '../screens/Dashboard';
import ControlRoom from '../screens/ControlRoom';
import HomePage from '../screens/HomePage';
import { Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Entypo name="home" size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Conversation"
                    component={Conversation}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Entypo name="chat" size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Control Room"
                    component={ControlRoom}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="book" size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="dashboard" size={20} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: () => (
                            <Avatar bgColor="$primary500" size="xs" borderRadius="$full">
                                <AvatarFallbackText>Anukrati Mehta</AvatarFallbackText>
                            </Avatar>
                        ),
                    }}
                />
            </Tab.Navigator>
    );
};

export default TabNavigator;
