import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

export default function BalancesTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        No balances yet
      </Text>
    </View>
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
    fontSize: 18,
    fontWeight: "600",
  },
});