import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";

import { loginUser } from "../../services/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      await loginUser(email, password);

      Alert.alert("Success", "Logged in");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>
        MachanHub Expenses
      </Text>

      <Text style={styles.subtitle}>
        Manage shared expenses easily
      </Text>

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter password"
      />

      <Button
        title="Login"
        onPress={handleLogin}
        loading={loading}
      />

      <TouchableOpacity>
        <Text style={styles.link}>
          Create Account
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 40,
  },

  link: {
    color: Colors.primary,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});