import React, {
  useState,
} from "react";

import {
  View,
  TextInput,
  Button,
} from "react-native";

export default function AddExpenseScreen() {
  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Expense title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Button
        title="Save Expense"
        onPress={() => {}}
      />
    </View>
  );
}