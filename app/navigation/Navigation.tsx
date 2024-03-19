import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';

const AppNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <TabNavigator/>
        </NavigationContainer>
    );
};

export default AppNavigation;
