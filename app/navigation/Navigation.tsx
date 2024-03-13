import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Conversation from '../screens/Conversation';
import Dashboard from '../screens/Dashboard';
import ControlRoom from '../screens/ControlRoom';
import StackNavigator from './StackNavigator';


const Tab = createBottomTabNavigator();

const AppNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={StackNavigator}
                    options={{
                        headerShown: false,
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
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
