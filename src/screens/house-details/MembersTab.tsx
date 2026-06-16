import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

import {
  getMembers,
} from "../../services/member";

type Props = {
  houseId: string;
};

export default function MembersTab({
  houseId,
}: Props) {
  const [members, setMembers] =
    useState<any[]>([]);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers =
    async () => {
      const data =
  await getMembers(
    houseId
  );

      setMembers(data);
    };

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        keyExtractor={(item) =>
          item.uid
        }
        ListEmptyComponent={() => (
          <View
            style={styles.emptyContainer}
          >
            <Text
              style={styles.emptyTitle}
            >
              👥 No Members Yet
            </Text>

            <Text
              style={styles.emptySubtitle}
            >
              Invite friends using
              the house code.
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text
              style={styles.name}
            >
              👤 {item.name}
            </Text>

            <Text
              style={styles.email}
            >
              {item.email}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor:
        Colors.background,
    },

    card: {
      backgroundColor:
        Colors.surface,
      padding: 18,
      borderRadius: 18,
      marginBottom: 12,
      borderWidth: 1,
      borderColor:
        Colors.border,
    },

    name: {
      color: Colors.text,
      fontSize: 16,
      fontWeight: "700",
    },

    email: {
      color:
        Colors.textSecondary,
      marginTop: 6,
    },

    emptyContainer: {
      alignItems: "center",
      marginTop: 60,
    },

    emptyTitle: {
      color: Colors.text,
      fontSize: 18,
      fontWeight: "700",
    },

    emptySubtitle: {
      color:
        Colors.textSecondary,
      marginTop: 8,
      textAlign: "center",
    },
  });