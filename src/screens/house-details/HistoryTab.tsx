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

import {
  getSettlements,
} from "../../services/settlement";

import {
  getMembers,
} from "../../services/member";

type Props = {
  houseId: string;
};

export default function HistoryTab({
  houseId,
}: Props) {
  const [history, setHistory] =
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
    const settlements =
      await getSettlements(
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
        member.name ||
        member.email;
    });

    setMemberMap(map);
    setHistory(settlements);
  }

  return (
    <FlatList
      style={styles.list}
      data={history}
      keyExtractor={(item) =>
        item.id
      }
      ListEmptyComponent={() => (
        <Text style={styles.empty}>
          No settlement history
        </Text>
      )}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text
            style={styles.title}
          >
            {
              memberMap[
                item.from
              ]
            }{" "}
            paid{" "}
            {
              memberMap[
                item.to
              ]
            }
          </Text>

          <Text
            style={styles.amount}
          >
            ₹{item.amount}
          </Text>

          <Text
            style={styles.date}
          >
            {new Date(
              item.settledAt
            ).toLocaleString()}
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
      padding: 16,
      borderRadius: 14,
      marginBottom: 12,
    },

    title: {
      color: Colors.text,
      fontSize: 16,
      fontWeight: "600",
    },

    amount: {
      marginTop: 8,
      fontSize: 22,
      fontWeight: "700",
      color: "#22c55e",
    },

    date: {
      marginTop: 8,
      color:
        Colors.textSecondary,
    },

    empty: {
      textAlign: "center",
      marginTop: 40,
      color:
        Colors.textSecondary,
    },
  });