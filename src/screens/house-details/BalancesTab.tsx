import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";

import Colors from "../../constants/colors";

import { calculateBalances } from "../../services/balance";

import { useFocusEffect } from "@react-navigation/native";

import { getMembers } from "../../services/member";

type Props = {
  houseId: string;
};

export default function BalancesTab({ houseId }: Props) {
  const [balances, setBalances] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [memberMap, setMemberMap] =
  useState<Record<string, string>>({});

  useFocusEffect(
  React.useCallback(() => {
    loadBalances();
    loadMembers();
  }, [])
);
async function loadMembers() {
  const members =
    await getMembers(houseId);

  const map: Record<
    string,
    string
  > = {};

  members.forEach((member) => {
    map[member.uid] =
      member.email;
  });

  setMemberMap(map);
}
  async function loadBalances() {
    setLoading(true);

    const result = await calculateBalances(houseId);

    const formatted = Object.entries(result).map(([uid, amount]) => ({
      uid,
      amount,
    }));

    setBalances(formatted);

    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading balances...</Text>
      </View>
    );
  }

  if (!loading && balances.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No balances yet</Text>
      </View>
    );
  }

  if (balances.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading balances...</Text>
      </View>
    );
  }

  return (
    console.log("RENDER BALANCES:", balances),
    (
      <FlatList
        style={styles.list}
        data={balances}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>
  {memberMap[item.uid] ??
    item.uid}
</Text>

            <Text>
  {item.amount < 0
    ? `Owes ₹${Math.abs(
        item.amount
      ).toFixed(2)}`
    : `Gets ₹${item.amount.toFixed(
        2
      )}`}
</Text>
          </View>
        )}
      />
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },

  list: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
