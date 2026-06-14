import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import HousesScreen from "../screens/houses/HousesScreen";
import HouseDetailsScreen from "../screens/house-details/HouseDetailsScreen";

const Stack =
  createNativeStackNavigator();

export default function HouseNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Houses"
        component={HousesScreen}
      />

      <Stack.Screen
        name="HouseDetails"
        component={HouseDetailsScreen}
      />
    </Stack.Navigator>
  );
}