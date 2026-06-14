import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import Colors from "../../constants/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: any;
}

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🏠</Text>
        </View>

        <Text style={styles.title}>MachanHub Expenses</Text>

        <Text style={styles.subtitle}>
          Split expenses, track balances, and stay friends.
        </Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={async () => {
  await AsyncStorage.setItem(
    "onboardingCompleted",
    "true"
  );

  navigation.replace("Login");
}}
        >
          <Text style={styles.primaryText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    fontSize: 50,
  },

  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    lineHeight: 24,
  },

  bottom: {
    paddingBottom: 20,
  },

  primaryButton: {
    backgroundColor: Colors.primary,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
