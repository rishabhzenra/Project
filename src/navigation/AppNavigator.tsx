import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Colors } from '../constants/colors';

import HomeScreen from '../screens/HomeScreen';
import AccountsScreen from '../screens/AccountsScreen';
import AccountDetailScreen from '../screens/AccountDetailScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import UPIScreen from '../screens/UPIScreen';
import UPIHistoryScreen from '../screens/UPIHistoryScreen';
import FundTransferScreen from '../screens/FundTransferScreen';
import FixedDepositsScreen from '../screens/FixedDepositsScreen';
import LoansScreen from '../screens/LoansScreen';
import OffersScreen from '../screens/OffersScreen';
import BillPayScreen from '../screens/BillPayScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: Colors.white },
  headerTintColor: Colors.text,
  headerTitleStyle: { fontWeight: '700' as const, fontSize: 17 },
  contentStyle: { backgroundColor: Colors.background },
  headerShadowVisible: false,
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Accounts" component={AccountsScreen} options={{ title: 'My Accounts' }} />
      <Stack.Screen name="AccountDetail" component={AccountDetailScreen} options={{ title: 'Account Details' }} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Transactions' }} />
      <Stack.Screen name="UPI" component={UPIScreen} options={{ title: 'UPI Payments' }} />
      <Stack.Screen name="UPIHistory" component={UPIHistoryScreen} options={{ title: 'UPI History' }} />
      <Stack.Screen name="QRCode" component={UPIScreen} options={{ title: 'QR Code' }} />
      <Stack.Screen name="FundTransfer" component={FundTransferScreen} options={{ title: 'Fund Transfer' }} />
      <Stack.Screen name="FixedDeposits" component={FixedDepositsScreen} options={{ title: 'Fixed Deposits' }} />
      <Stack.Screen name="Loans" component={LoansScreen} options={{ title: 'My Loans' }} />
      <Stack.Screen name="Offers" component={OffersScreen} options={{ title: 'Offers' }} />
      <Stack.Screen name="BillPay" component={BillPayScreen} options={{ title: 'Bill Payment' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
    </Stack.Navigator>
  );
}

function BankingStack() {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen name="BankingHome" component={AccountsScreen} options={{ title: 'Banking' }} />
      <Stack.Screen name="AccountDetail" component={AccountDetailScreen} options={{ title: 'Account Details' }} />
      <Stack.Screen name="FixedDeposits" component={FixedDepositsScreen} options={{ title: 'Fixed Deposits' }} />
      <Stack.Screen name="Loans" component={LoansScreen} options={{ title: 'My Loans' }} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Transactions' }} />
      <Stack.Screen name="FundTransfer" component={FundTransferScreen} options={{ title: 'Fund Transfer' }} />
    </Stack.Navigator>
  );
}

function PaymentsStack() {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen name="PaymentsHome" component={UPIScreen} options={{ title: 'Payments' }} />
      <Stack.Screen name="UPIHistory" component={UPIHistoryScreen} options={{ title: 'UPI History' }} />
      <Stack.Screen name="FundTransfer" component={FundTransferScreen} options={{ title: 'Fund Transfer' }} />
      <Stack.Screen name="BillPay" component={BillPayScreen} options={{ title: 'Bill Payment' }} />
    </Stack.Navigator>
  );
}

function InsuranceStack() {
  return (
    <Stack.Navigator screenOptions={headerStyle}>
      <Stack.Screen name="InsuranceHome" component={OffersScreen} options={{ title: 'Insurance & Offers' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.white,
            borderTopColor: Colors.border,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 6,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textLight,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 16, color }}>H</Text>,
          }}
        />
        <Tab.Screen
          name="BankingTab"
          component={BankingStack}
          options={{
            title: 'Banking',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 16, color }}>B</Text>,
          }}
        />
        <Tab.Screen
          name="PaymentsTab"
          component={PaymentsStack}
          options={{
            title: 'Payments',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 16, color }}>P</Text>,
          }}
        />
        <Tab.Screen
          name="InsuranceTab"
          component={InsuranceStack}
          options={{
            title: 'Insurance',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 16, color }}>I</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
