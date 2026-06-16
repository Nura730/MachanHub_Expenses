import React, {
  useEffect,
  useState,
} from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import Colors from "../../constants/colors";

import HouseTabs from "../../navigation/HouseTabs";

import {
  getHouseSummary,
} from "../../services/dashboard";

import {
  getUserProfile,
} from "../../services/user";

import {
  auth,
} from "../../services/firebase";

export default function HouseDetailsScreen({
  route,
}: any) {
  const { house } =
    route.params;

  const navigation =
    useNavigation<any>();

  const [userName, setUserName] =
    useState("User");

  const [summary, setSummary] =
    useState({
      totalExpenses: 0,
      totalMembers: 0,
      pendingSettlement: 0,
    });

  useEffect(() => {
    loadSummary();
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profile =
        await getUserProfile(
          auth.currentUser!.uid
        );

      if (profile?.name) {
        setUserName(
          profile.name
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loadSummary() {
    try {
      const data =
        await getHouseSummary(
          house.id
        );

      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.header}>
        <Text
          style={styles.welcome}
        >
          Welcome Back,
          {" "}
          {userName} 👋
        </Text>

        <View
          style={styles.titleRow}
        >
          <Text
            style={styles.title}
          >
            {house.name}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "Profile"
              )
            }
          >
            <Text
              style={
                styles.profileIcon
              }
            >
              👤
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={styles.code}
        >
          Join Code:
          {" "}
          {house.code}
        </Text>

        <View
          style={
            styles.summaryCard
          }
        >
          <View
            style={
              styles.summaryItem
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              ₹
              {
                summary.totalExpenses
              }
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Total Expenses
            </Text>
          </View>

          <View
            style={
              styles.summaryItem
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              {
                summary.totalMembers
              }
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Members
            </Text>
          </View>

          <View
            style={
              styles.summaryItem
            }
          >
            <Text
              style={
                styles.summaryValue
              }
            >
              ₹
              {summary.pendingSettlement.toFixed(
                0
              )}
            </Text>

            <Text
              style={
                styles.summaryLabel
              }
            >
              Pending
            </Text>
          </View>
        </View>
      </View>

      <View
        style={styles.content}
      >
        <HouseTabs
          house={house}
        />
      </View>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.background,
      paddingTop: 20,
    },

    header: {
      padding: 20,
    },

    welcome: {
      color:
        Colors.textSecondary,
      marginBottom: 10,
      fontSize: 15,
    },

    titleRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
    },

    title: {
      color: Colors.text,
      fontSize: 28,
      fontWeight: "700",
    },

    profileIcon: {
      fontSize: 26,
    },

    code: {
      color:
        Colors.textSecondary,
      marginTop: 8,
    },

    content: {
      flex: 1,
    },

    summaryCard: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      backgroundColor:
        Colors.surface,
      padding: 20,
      borderRadius: 18,
      marginTop: 20,
    },

    summaryItem: {
      alignItems: "center",
    },

    summaryValue: {
      color:
        Colors.primary,
      fontSize: 22,
      fontWeight: "700",
    },

    summaryLabel: {
      color:
        Colors.textSecondary,
      marginTop: 6,
    },
  });