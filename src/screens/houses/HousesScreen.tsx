import React, { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { auth, db } from "../../services/firebase";

import Colors from "../../constants/colors";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { generateHouseCode } from "../../utils/generateHouseCode";

export default function HousesScreen() {
  const [houseName, setHouseName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleCreateHouse =
    async () => {
      try {
        if (!houseName.trim()) {
          Alert.alert(
            "Validation",
            "Enter house name"
          );
          return;
        }

        setLoading(true);

        const code =
          generateHouseCode();

        await addDoc(
          collection(db, "houses"),
          {
            name: houseName,
            code,
            createdBy:
              auth.currentUser?.uid,
            createdAt: Date.now(),
          }
        );

        Alert.alert(
          "Success",
          `House created.\nJoin Code: ${code}`
        );

        setHouseName("");
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <Text style={styles.title}>
        Create House
      </Text>

      <Text style={styles.subtitle}>
        Start a shared expense space
        for your roommates.
      </Text>

      <View style={styles.form}>
        <Input
          label="House Name"
          value={houseName}
          onChangeText={setHouseName}
          placeholder="Machan Hub"
        />

        <Button
          title="Create House"
          onPress={
            handleCreateHouse
          }
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color:
      Colors.textSecondary,
    marginTop: 10,
    marginBottom: 40,
  },

  form: {
    gap: 12,
  },
});