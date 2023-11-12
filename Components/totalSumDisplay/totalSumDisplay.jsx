import React from "react";
import { Text, View } from "react-native";

const TotalSumDisplay = (props) => {
  const { sum } = props;
  const { currency } = props;

  return (
    <View style={{ backgroundColor: "orange", padding: 20, borderRadius: 10 }}>
      <Text style={{ fontSize: 24, color: "white" }}>
        You have {sum} {currency}
      </Text>
    </View>
  );
};

export default TotalSumDisplay;
