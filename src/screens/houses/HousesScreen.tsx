import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Modal from "react-native-modal";

import { getUserHouses } from "../../services/houseQueries";

import { auth, db } from "../../services/firebase";

import Colors from "../../constants/colors";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { generateHouseCode } from "../../utils/generateHouseCode";

import { createHouse } from "../../services/house";

import { joinHouseByCode } from "../../services/member";

import { getUserProfile } from "../../services/user";
interface House {
  id: string;
  name: string;
  code: string;
}

export default function HousesScreen({ navigation }: any) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [houseName, setHouseName] = useState("");
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [loadingHouses, setLoadingHouses] = useState(true);
  const [userName, setUserName] = useState("User");

  const loadProfile = async () => {
    try {
      const profile = await getUserProfile(auth.currentUser!.uid);

      if (profile?.name) {
        setUserName(profile.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadHouses = async () => {
    try {
      setLoadingHouses(true);

      const houses = await getUserHouses(auth.currentUser!.uid);

      setHouses(houses as any);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingHouses(false);
    }
  };

  useEffect(() => {
    loadHouses();
    loadProfile();
  }, []);

  const handleCreateHouse = async () => {
    try {
      if (!houseName.trim()) {
        Alert.alert("Validation", "Enter house name");
        return;
      }

      setLoading(true);

      const code = generateHouseCode();

      await createHouse(
        houseName,
        code,
        auth.currentUser!.uid,
        auth.currentUser!.email || "",
      );

      Alert.alert("Success", `House created.\nJoin Code: ${code}`);

      setHouseName("");
      setModalVisible(false);

      loadHouses();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinHouse = async () => {
    try {
      if (!joinCode.trim()) {
        Alert.alert("Validation", "Enter join code");
        return;
      }

      await joinHouseByCode(
        joinCode,
        auth.currentUser!.uid,
        auth.currentUser!.email || "",
      );

      Alert.alert("Success", "Joined House");

      setJoinCode("");
      setJoinModalVisible(false);

      loadHouses();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
  };

  const renderHouse = ({ item }: { item: House }) => (
    <TouchableOpacity
      style={styles.houseCard}
      onPress={() =>
        navigation.navigate("HouseDetails", {
          house: item,
        })
      }
    >
      <Text style={styles.houseName}>🏠 {item.name}</Text>

      <Text style={styles.houseCode}>Code: {item.code}</Text>
    </TouchableOpacity>
  );

  if (loadingHouses) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Loading Houses...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
  style={{
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  }}
>
  <Text style={styles.welcome}>
    Welcome Back {userName} 👋
  </Text>

  <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        "Profile"
      )
    }
  >
    <Text
      style={{
        fontSize: 24,
      }}
    >
      👤
    </Text>
  </TouchableOpacity>
</View>

        <Text style={styles.email}>Manage your shared expenses</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsValue}>{houses.length}</Text>

        <Text style={styles.statsLabel}>Active Houses</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Houses</Text>
      </View>

      <FlatList
        data={houses}
        keyExtractor={(item) => item.id}
        renderItem={renderHouse}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
  🏠 No Houses Yet
</Text>

<Text style={styles.emptySubText}>
  Create or join a house
  to start tracking expenses.
</Text>

            <Text style={styles.emptySubText}>Create your first house</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.secondaryText}>Create House</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setJoinModalVisible(true)}
        >
          <Text style={styles.secondaryText}>Join House</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Create House</Text>

          <Input
            label="House Name"
            value={houseName}
            onChangeText={setHouseName}
            placeholder="Machan Hub"
          />

          <Button
            title="Create"
            onPress={handleCreateHouse}
            loading={loading}
          />
        </View>
      </Modal>

      <Modal
        isVisible={joinModalVisible}
        onBackdropPress={() => setJoinModalVisible(false)}
      >
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Join House</Text>

          <Input
            label="Join Code"
            value={joinCode}
            onChangeText={setJoinCode}
            placeholder="ABCD12"
          />

          <Button title="Join" onPress={handleJoinHouse} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  header: {
    marginTop: 20,
  },

  welcome: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
  },

  email: {
    color: Colors.textSecondary,
    marginTop: 6,
  },

  statsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    alignItems: "center",
  },

  statsValue: {
    color: Colors.primary,
    fontSize: 34,
    fontWeight: "700",
  },

  statsLabel: {
    color: Colors.textSecondary,
    marginTop: 6,
  },

  sectionHeader: {
    marginTop: 30,
    marginBottom: 16,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  houseCard: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  houseName: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },

  houseCode: {
    color: Colors.textSecondary,
    marginTop: 8,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },

  emptySubText: {
    color: Colors.textSecondary,
    marginTop: 8,
  },

  footer: {
    gap: 12,
    marginBottom: 20,
  },

  secondaryButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  logoutButton: {
    backgroundColor: Colors.surface,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  logoutText: {
    color: Colors.danger,
    fontWeight: "700",
  },

  modalCard: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
});
