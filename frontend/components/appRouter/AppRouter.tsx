import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { publicRoutes } from './routes';
import { CALENDAR_ROUTE } from '../../variables/variables';

const Stack = createNativeStackNavigator();

const AppRouter: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={CALENDAR_ROUTE}>
        {publicRoutes.map(({ path, Component }) => (
          <Stack.Screen 
            key={path}  
            name={path} 
            component={Component} 
            options={{ headerShown: false }}
        />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;