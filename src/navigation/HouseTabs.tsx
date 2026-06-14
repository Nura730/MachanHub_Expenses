import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExpensesTab from "../screens/house-details/ExpensesTab";
import MembersTab from "../screens/house-details/MembersTab";
import BalancesTab from "../screens/house-details/BalancesTab";

import Colors from "../constants/colors";

const Tab = createBottomTabNavigator();

export default function HouseTabs() {
    house,
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Expenses"
        component={ExpensesTab}
      />

      <Tab.Screen
        name="Members"
        component={MembersTab}
      />

      <Tab.Screen
        name="Balances"
        component={BalancesTab}
      />
    </Tab.Navigator>
  );
}