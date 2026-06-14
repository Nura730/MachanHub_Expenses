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

import { loginUser } from "../../services/auth";

export default function LoginScreen({
  navigation,
}: any) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        "Validation",
        "Fill all fields"
      );
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
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
          Welcome Back 👋
        </Text>

        <Text style={styles.subtitle}>
          Sign in to continue managing
          your shared expenses.
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

        <Button
          title="Login"
          onPress={handleLogin}
          loading={loading}
        />
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Register")
        }
      >
        <Text style={styles.link}>
          Don't have an account? Register
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