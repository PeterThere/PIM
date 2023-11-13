import React from "react";
import { Pressable, Text, View } from "react-native";

const TotalSumDisplay = (props) => {
  const { sum } = props;
  const { currency } = props;

  return (
    <View
      style={{
        backgroundColor: "orange",
        padding: 20,
        margin: 20,
        borderRadius: 10,
      }}
    >
      <Pressable onPress={props.changeCurrency()}>
        <Text style={{ fontSize: 24, color: "white" }}>
          You have {sum} {currency}
        </Text>
      </Pressable>
    </View>
  );
};

export default TotalSumDisplay;
