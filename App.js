import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { PlacesProvider } from './src/context/PlacesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <PlacesProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </PlacesProvider>
  );
}
