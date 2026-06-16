import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Colors from "../../constants/colors";

import {
  auth,
} from "../../services/firebase";

import {
  getUserProfile,
} from "../../services/user";

export default function ProfileScreen() {
  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const data =
      await getUserProfile(
        auth.currentUser!.uid
      );

    setProfile(data);
  }

  if (!profile) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>
          👤
        </Text>

        <Text style={styles.name}>
          {profile.name}
        </Text>

        <Text style={styles.email}>
          {profile.email}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() =>
          auth.signOut()
        }
      >
        <Text
          style={styles.logoutText}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
      padding: 20,
      justifyContent:
        "center",
    },

    card: {
      backgroundColor:
        Colors.surface,
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
    },

    avatar: {
      fontSize: 60,
    },

    name: {
      color: Colors.text,
      fontSize: 24,
      fontWeight: "700",
      marginTop: 12,
    },

    email: {
      color:
        Colors.textSecondary,
      marginTop: 8,
    },

    logout: {
      backgroundColor:
        Colors.surface,
      marginTop: 20,
      padding: 18,
      borderRadius: 16,
      alignItems: "center",
    },

    logoutText: {
      color:
        Colors.danger,
      fontWeight: "700",
    },
  });