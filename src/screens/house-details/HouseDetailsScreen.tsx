import React from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Colors from "../../constants/colors";

import HouseTabs from "../../navigation/HouseTabs";

export default function HouseDetailsScreen({
  route,
}: any) {
  const { house } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {house.name}
        </Text>

        <Text style={styles.code}>
          Join Code: {house.code}
        </Text>
      </View>

      <View style={styles.content}>
        <HouseTabs house={house} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    padding: 20,
  },

  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
  },

  code: {
    color: Colors.textSecondary,
    marginTop: 8,
  },

  content: {
    flex: 1,
  },
});