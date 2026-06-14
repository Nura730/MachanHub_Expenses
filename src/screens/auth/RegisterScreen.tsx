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

import { registerUser } from "../../services/auth";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await registerUser(email, password);

      Alert.alert(
        "Success",
        "Account Created"
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>
        Create Account
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
        title="Register"
        onPress={handleRegister}
        loading={loading}
      />

      <TouchableOpacity>
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
    justifyContent: "center",
    padding: 24,
  },

  logo: {
    color: Colors.text,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 30,
  },

  link: {
    color: Colors.primary,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});