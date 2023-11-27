import React from "react";
import { Pressable, Text, View } from "react-native";
import roundNumber from "../../utils/roundNumber";

const TotalSumDisplay = (props) => {
  const sum = roundNumber(props.sum);
  const { currency } = props;
  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] =
    React.useState(false);

  const handlePress = () => {
    setIsCurrencyPopUpVisible(!isCurrencyPopUpVisible);
  };

  return (
    <View
      style={{
        backgroundColor: "orange",
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: "flex",
        bottom: 0,
        zIndex: 999,
        position: "absolute",
      }}
    >
      <Pressable onPress={handlePress}>
        <Text style={{ fontSize: 24, color: "white" }}>
          You have {sum} {currency}
        </Text>
      </Pressable>
    </View>
  );
};

export default TotalSumDisplay;
