import React, {
  useEffect,
  useState,
} from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "../screens/auth/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack =
  createNativeStackNavigator();

export default function AuthNavigator() {
  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    showOnboarding,
    setShowOnboarding,
  ] = useState(false);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding =
    async () => {
      const completed =
        await AsyncStorage.getItem(
          "onboardingCompleted"
        );

      setShowOnboarding(
        !completed
      );

      setLoading(false);
    };

  if (loading) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        showOnboarding
          ? "Onboarding"
          : "Login"
      }
    >
      <Stack.Screen
        name="Onboarding"
        component={
          OnboardingScreen
        }
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={
          RegisterScreen
        }
      />
    </Stack.Navigator>
  );
}