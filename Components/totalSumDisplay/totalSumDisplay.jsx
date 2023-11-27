import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import roundToTwoDecimalPlaces from "../../utils/roundNumber";

const TotalSumDisplay = (props) => {
  const { currency, items } = props;
  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(false);
  const [sum, setSum] = useState(0);

  const handlePress = () => {
    setIsCurrencyPopUpVisible(!isCurrencyPopUpVisible);
  };

  useEffect(() => {
    calculateSum();
  }, [items, props.exchangeRates]);

  const calculateSum = () => {
    let sum = 0;
    if (!items) return 0;
    items.forEach((item) => {
      const exchangeRate = props.exchangeRates[item.currencyShortName];
      sum += parseFloat(item.numberOfUnits) * exchangeRate;
    });
    setSum(roundToTwoDecimalPlaces(sum));
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
