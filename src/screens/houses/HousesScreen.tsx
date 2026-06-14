import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import Colors from "../../constants/colors";

export default function HousesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        MachanHub Expenses
      </Text>

      <Text style={styles.subtitle}>
        Houses Dashboard
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    color: Colors.textSecondary,
    marginTop: 10,
  },
});