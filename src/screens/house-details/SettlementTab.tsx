import React, { useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import Colors from "../../constants/colors";
import { getMembers } from "../../services/member";
import { calculateBalances } from "../../services/balance";
import { calculateSettlements } from "../../utils/calculateSettlements";
import { TouchableOpacity, Alert } from "react-native";

import { createSettlement } from "../../services/settlement";

type Props = {
  houseId: string;
};

function getDisplayName(email: string) {
  if (!email) return "Unknown";

  const name = email.split("@")[0];

  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function SettlementTab({ houseId }: Props) {
  const [settlements, setSettlements] = useState<any[]>([]);

  const [memberMap, setMemberMap] = useState<Record<string, string>>({});

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  async function loadData() {
    const balances = await calculateBalances(houseId);

    const members = await getMembers(houseId);

    const map: Record<string, string> = {};

    members.forEach((member) => {
      map[member.uid] = member.name || getDisplayName(member.email);
    });

    setMemberMap(map);

    const result = calculateSettlements(balances);

    setSettlements(result);
  }

  async function markPaid(item: any) {
    try {
      await createSettlement(houseId, item.from, item.to, item.amount);

      Alert.alert("Success", "Settlement saved");
    } catch {
      Alert.alert("Error", "Could not save settlement");
    }
  }

  return (
    <FlatList
      style={styles.list}
      data={settlements}
      keyExtractor={(_, index) => index.toString()}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>No settlements needed 🎉</Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.from}>💸 {memberMap[item.from]}</Text>

          <Text style={styles.middle}>Pay ₹{item.amount.toFixed(2)}</Text>

          <Text style={styles.to}>➜ To {memberMap[item.to]}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => markPaid(item)}
          >
            <Text style={styles.buttonText}>✓ Mark Paid</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },

  card: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 14,
  },

  from: {
    color: "#ef4444",
    fontSize: 18,
    fontWeight: "700",
  },

  middle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 12,
  },

  to: {
    color: "#22c55e",
    fontSize: 16,
    fontWeight: "600",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: Colors.textSecondary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
