import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HousesScreen from "../screens/houses/HousesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
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
    </Stack.Navigator>
  );
}