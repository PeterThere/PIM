import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

function ManageMoneyButton({ onClick, isAdd }) {
  return (
    <View>
      <Pressable onPress={onClick} style={styles.button}>
        <Text style={styles.text}>{isAdd ? "+" : "-"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "black",
    margin: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ManageMoneyButton;
