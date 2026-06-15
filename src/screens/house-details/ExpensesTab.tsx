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

type Props = {
  houseId: string;
};

export default function ExpensesTab({ houseId }: Props) {
  const [expenses, setExpenses] = useState<any[]>([]);

  const navigation = useNavigation<any>();

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await getExpenses(houseId);
    setExpenses(data);
  };

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
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.amount}>₹{item.amount}</Text>
            </View>
          )}
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
});