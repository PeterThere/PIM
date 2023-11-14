import React from "react";
import { View, Text } from "react-native";

const CurrencyPopUp = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 999,
        backgroundColor: "#ccd",
        borderRadius: 20,
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 50 }}>{"Choose your currency"}</Text>
    </View>
  );
};

export default CurrencyPopUp;
