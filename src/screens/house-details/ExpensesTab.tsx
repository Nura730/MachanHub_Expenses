import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Colors from "../../constants/colors";
import { getExpenses } from "../../services/expense";
import { useFocusEffect } from "@react-navigation/native";
import { getMembers } from "../../services/member";
import { Alert } from "react-native";

import { deleteExpense } from "../../services/expense";

type Props = {
  houseId: string;
};

export default function ExpensesTab({ houseId }: Props) {
  const [expenses, setExpenses] = useState<any[]>([]);

  const navigation = useNavigation<any>();

  const [memberMap, setMemberMap] = useState<Record<string, string>>({});

  useFocusEffect(
    React.useCallback(() => {
      loadExpenses();
      loadMembers();
    }, []),
  );

  const loadExpenses = async () => {
    const data = await getExpenses(houseId);
    setExpenses(data);
  };

  async function loadMembers() {
    const members = await getMembers(houseId);

    const map: Record<string, string> = {};

    members.forEach((member) => {
      map[member.uid] = member.name || member.email;
    });

    setMemberMap(map);
  }

  function handleEdit(expense: any) {
    navigation.navigate("AddExpense", {
      houseId,
      expense,
    });
  }

  function handleDelete(expense: any) {
    Alert.alert("Delete Expense", `Delete "${expense.title}"?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteExpense(houseId, expense.id);

          loadExpenses();
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1 }}>
      {expenses.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.title}>No expenses yet</Text>
        </View>
      ) : (
        <FlatList
          style={styles.container}
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const participants = item.splitBetween ?? [];
            console.log("EXPENSE", item);

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
              }}
            ></View>;

            return (
              <View style={styles.card}>
                <Text
  style={{
    color: "#22c55e",
    marginBottom: 6,
    fontWeight: "600",
  }}
>
  {item.category || "📦 Other"}
</Text>

<Text style={styles.name}>
  {item.title}
</Text>

                <Text style={styles.amount}>₹{item.amount}</Text>

                <Text style={styles.meta}>
                  Paid by {memberMap[item.paidBy] ?? "Unknown"}
                </Text>

                <Text style={styles.meta}>
                  Split among {participants.length} members
                </Text>

                <Text style={styles.date}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 12,
                  }}
                >
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Text
                      style={{
                        color: "#3b82f6",
                        marginRight: 20,
                        fontWeight: "600",
                      }}
                    >
                      ✏️ Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDelete(item)}>
                    <Text
                      style={{
                        color: "#ef4444",
                        fontWeight: "600",
                      }}
                    >
                      🗑️ Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("AddExpense", {
            houseId,
          })
        }
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },

  empty: {
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

  card: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  name: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 16,
  },

  amount: {
    color: Colors.textSecondary,
    marginTop: 6,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
  },

  fabText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },
  meta: {
    color: Colors.textSecondary,
    marginTop: 6,
  },

  date: {
    color: Colors.textSecondary,
    marginTop: 8,
    fontSize: 12,
  },
});
