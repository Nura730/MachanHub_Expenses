import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import Colors from "./src/constants/colors";
import Card from "./src/components/ui/Card";
import Input from "./src/components/ui/Input";
import Button from "./src/components/ui/Button";

export default function App() {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>MachanHub Expenses</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
        />

        <Button title="Continue" onPress={() => {}} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
});
