import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Colors from "../../constants/colors";

import { registerUser } from "../../services/auth";

export default function RegisterScreen({
  navigation,
}: any) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert(
        "Validation",
        "Fill all fields"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Validation",
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      await registerUser(
        email,
        password
      );
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Start tracking shared expenses
          with your roommates.
        </Text>
      </View>

      <View style={styles.form}>
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

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
        />

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Login")
        }
      >
        <Text style={styles.link}>
          Already have an account?
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "700",
  },

  subtitle: {
    color: Colors.textSecondary,
    marginTop: 10,
    lineHeight: 22,
  },

  form: {
    marginTop: 40,
  },

  link: {
    color: Colors.primary,
    textAlign: "center",
    marginTop: 24,
    fontWeight: "600",
  },
});