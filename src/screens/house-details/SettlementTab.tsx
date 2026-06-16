import React, {
  useState,
} from "react";

import {
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import Colors from "../../constants/colors";

import { getMembers } from "../../services/member";
import { calculateBalances } from "../../services/balance";

import {
  calculateSettlements,
} from "../../utils/calculateSettlements";

type Props = {
  houseId: string;
};

export default function SettlementTab({
  houseId,
}: Props) {
  const [settlements, setSettlements] =
    useState<any[]>([]);

  const [memberMap, setMemberMap] =
    useState<Record<string, string>>(
      {}
    );

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  async function loadData() {
    const balances =
      await calculateBalances(
        houseId
      );

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

    const result =
      calculateSettlements(
        balances
      );

    setSettlements(result);
  }

  return (
    <FlatList
      style={styles.list}
      data={settlements}
      keyExtractor={(_, index) =>
        index.toString()
      }
      ListEmptyComponent={() => (
        <Text
          style={styles.empty}
        >
          No settlements needed 🎉
        </Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text
            style={styles.text}
          >
            💸 Pay
          </Text>

          <Text
            style={styles.name}
          >
            {
              memberMap[item.to]
            }
          </Text>

          <Text
            style={styles.amount}
          >
            ₹
            {item.amount.toFixed(
              2
            )}
          </Text>
        </View>
      )}
    />
  );
}

const styles =
  StyleSheet.create({
    list: {
      flex: 1,
      padding: 16,
      backgroundColor:
        Colors.background,
    },

    card: {
      backgroundColor:
        Colors.surface,
      padding: 18,
      borderRadius: 14,
      marginBottom: 12,
    },

    text: {
      color: "#ef4444",
      fontWeight: "700",
    },

    name: {
      color: Colors.text,
      fontSize: 18,
      marginTop: 6,
    },

    amount: {
      color: "#ef4444",
      fontSize: 24,
      fontWeight: "700",
      marginTop: 8,
    },

    empty: {
      textAlign: "center",
      marginTop: 40,
      color:
        Colors.textSecondary,
    },
  });