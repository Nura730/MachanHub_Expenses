import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExpensesTab from "../screens/house-details/ExpensesTab";
import MembersTab from "../screens/house-details/MembersTab";
import BalancesTab from "../screens/house-details/BalancesTab";

import Colors from "../constants/colors";

import SettlementTab from "../screens/house-details/SettlementTab";

const Tab = createBottomTabNavigator();

type Props = {
  house: any;
};

export default function HouseTabs({ house }: Props) {
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
      <Tab.Screen name="Expenses">
        {() => <ExpensesTab houseId={house.id} />}
      </Tab.Screen>

      <Tab.Screen name="Members">
        {() => <MembersTab houseId={house.id} />}
      </Tab.Screen>

      <Tab.Screen name="Balances">
        {() => <BalancesTab houseId={house.id} />}
      </Tab.Screen>

      <Tab.Screen
  name="Settlement"
>
  {() => (
    <SettlementTab
      houseId={house.id}
    />
  )}
</Tab.Screen>
    </Tab.Navigator>
  );
}
