import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

import {
  getHouseMembers,
} from "../../services/houseMembers";

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
        await getHouseMembers(
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
        renderItem={({ item }) => (
          <View
            style={styles.card}
          >
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
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
    },

    name: {
      color: Colors.text,
      fontSize: 16,
      fontWeight: "700",
    },

    email: {
      color:
        Colors.textSecondary,
      marginTop: 4,
    },
  });