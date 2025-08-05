import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import { AuthProvider } from './src/contexts/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CustomerHomeScreen from './src/screens/customer/CustomerHomeScreen';
import DriverHomeScreen from './src/screens/driver/DriverHomeScreen';
import AdminPanelScreen from './src/screens/admin/AdminPanelScreen';
import CreateOrderScreen from './src/screens/customer/CreateOrderScreen';
import TrackOrderScreen from './src/screens/customer/TrackOrderScreen';
import TrackOrderMapScreen from './src/screens/customer/TrackOrderMapScreen';
import DriverOrderScreen from './src/screens/driver/DriverOrderScreen';
import DriverMapScreen from './src/screens/driver/DriverMapScreen';
import DriversMapScreen from './src/screens/admin/DriversMapScreen';
import SupportScreen from './src/screens/SupportScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  CustomerHome: undefined;
  DriverHome: undefined;
  AdminPanel: undefined;
  CreateOrder: undefined;
  TrackOrder: { orderId: string };
  TrackOrderMap: { orderId: string };
  DriverOrder: { orderId: string };
  DriverMap: { orderId: string };
  DriversMap: undefined;
  Support: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="CustomerHome" component={CustomerHomeScreen} />
            <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
            <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
            <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
            <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
            <Stack.Screen name="TrackOrderMap" component={TrackOrderMapScreen} />
            <Stack.Screen name="DriverOrder" component={DriverOrderScreen} />
            <Stack.Screen name="DriverMap" component={DriverMapScreen} />
            <Stack.Screen name="DriversMap" component={DriversMapScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
} 