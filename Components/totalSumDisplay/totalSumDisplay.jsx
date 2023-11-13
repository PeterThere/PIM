import React from "react";
import { Pressable, Text, View } from "react-native";
import CurrencyPopUp from "../popUps/currencyPopUp";

const TotalSumDisplay = (props) => {
  const { sum } = props;
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
      }}
    >
      <Pressable onPress={handlePress}>
        <CurrencyPopUp isVisible={isCurrencyPopUpVisible} />
        <Text style={{ fontSize: 24, color: "white" }}>
          You have {sum} {currency}
        </Text>
      </Pressable>
    </View>
  );
};

export default TotalSumDisplay;
