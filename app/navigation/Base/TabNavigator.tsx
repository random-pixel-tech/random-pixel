import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conversation from '../../screens/Conversation';
import Dashboard from '../../screens/Dashboard';
import ControlRoom from '../../screens/ControlRoom/ControlRoom';
import HomePage from '../../screens/HomePage';
import { Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import Profile from '../../screens/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


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
                            <FontAwesomeIcon icon="house" size={focused ? 24 : 20} color={color}/>
                            ),
                    }}
                />
                <Tab.Screen
                    name="Conversation"
                    component={Conversation}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesomeIcon icon="comment" size={focused ? 24 : 20} color={color}/>

                        ),
                    }}
                />
                <Tab.Screen
                    name="Control Room"
                    component={ControlRoom}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesomeIcon icon="book-open" size={focused ? 24 : 20} color={color}/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesomeIcon icon="chart-simple" size={focused ? 24 : 20} color={color}/>
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
