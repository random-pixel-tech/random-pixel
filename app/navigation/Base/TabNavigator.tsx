import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conversation from '../../screens/Conversation';
import Dashboard from '../../screens/DashboardScreen/Dashboard';
import ControlRoom from '../../screens/ControlRoomScreen/ControlRoom';
import HomePage from '../../screens/HomePage';
import { Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import Profile from '../../screens/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AttendanceActionSheetNav from '../ControlRoomNav/AttendanceActionSheetNav';


const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
    return (
            <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: '#5f31dd',
                tabBarStyle: { 
                    height: 60,
                    paddingBottom: 5,
                    paddingHorizontal: 0,
                }, 
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
                            <FontAwesomeIcon icon="comment" size={focused ? 24 : 20} color={color} style={ {marginRight: 10}}/>

                        ),
                        tabBarLabelStyle: { marginRight: 10 }

                    }}
                />
                <Tab.Screen
                    name="Control Room"
                    component={AttendanceActionSheetNav}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesomeIcon icon="book-open" size={focused ? 24 : 20} color={color}/>
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <FontAwesomeIcon icon="chart-simple" size={focused ? 24 : 20} color={color} style={ {marginLeft: 10}}/>
                        ),
                        tabBarLabelStyle: { marginLeft: 10 }
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
