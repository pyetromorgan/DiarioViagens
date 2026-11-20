import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/theme';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceFormScreen from '../screens/PlaceFormScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import MapScreen from '../screens/MapScreen';
import StatsScreen from '../screens/StatsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700' },
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerStyle,
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({ color, size }) => {
          const icons = { Lugares: 'list', Mapa: 'map', Estatísticas: 'pie-chart' };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Lugares" component={PlacesListScreen} options={{ title: 'Diário de Viagens' }} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Estatísticas" component={StatsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={PlaceFormScreen} options={{ title: 'Cadastro de lugar' }} />
      <Stack.Screen name="Detalhes" component={PlaceDetailsScreen} options={{ title: 'Detalhes do lugar' }} />
    </Stack.Navigator>
  );
}
