import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { useRoute, useNavigation } from "@react-navigation/native";

import { createExpense } from "../../services/expense";
import { getMembers } from "../../services/member";

export default function AddExpenseScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { houseId } = route.params;

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [members, setMembers] = useState<any[]>([]);

  const [payer, setPayer] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const data = await getMembers(houseId);

    setMembers(data);

    setSelectedMembers(data.map((member) => member.uid));
  }

  function toggleMember(uid: string) {
    setSelectedMembers((prev) => {
      if (prev.includes(uid)) {
        return prev.filter((id) => id !== uid);
      }

      return [...prev, uid];
    });
  }

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert("Error", "Enter title");
      return;
    }

    if (!amount.trim()) {
      Alert.alert("Error", "Enter amount");
      return;
    }

    if (!payer) {
      Alert.alert("Error", "Select payer");
      return;
    }

    await createExpense({
      houseId,
      title,
      amount: Number(amount),
      paidBy: payer,
      splitBetween: selectedMembers,
      createdAt: Date.now(),
    });

    if (selectedMembers.length === 0) {
    Alert.alert("Error", "Select at least one participant");

    return;
  }

    Alert.alert("Success", "Expense added");

    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Pizza"
      />

      <Text style={styles.label}>Amount</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="500"
      />

      <Text style={styles.label}>Paid By</Text>
      {members.map((member) => (
  <TouchableOpacity
    key={member.uid}
    style={[
      styles.member,
      payer === member.uid && styles.selectedMember,
    ]}
    onPress={() => setPayer(member.uid)}
  >
    <Text>
      {payer === member.uid ? "💰 " : "⬜ "}
      {member.email}
    </Text>
  </TouchableOpacity>
))}

      <Text style={styles.label}>Participants</Text>

      {members.map((member) => (
        <TouchableOpacity
          key={member.uid}
          style={[
            styles.member,
            selectedMembers.includes(member.uid) && styles.selectedMember,
          ]}
          onPress={() => toggleMember(member.uid)}
        >
          <Text>
            {selectedMembers.includes(member.uid) ? "✅ " : "⬜ "}
            {member.email}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Expense</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  label: {
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },

  member: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#4CAF50",
    marginTop: 25,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  selectedMember: {
    borderWidth: 2,
    borderColor: "#4CAF50",
  },
});
