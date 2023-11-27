import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import roundNumber from "../../utils/roundNumber";

const TotalSumDisplay = (props) => {
  const { exchangeRates, currency } = props;
  const items =  props.items;
  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(false);
  const [sum, setSum] = useState(0);

  const handlePress = () => {
    setIsCurrencyPopUpVisible(!isCurrencyPopUpVisible);
  };

  useEffect(() => {
    calculateSum();
  }, [items]);

  const calculateSum = () => {
    let sum = 0;
    console.log("ASFHDKASDFKAS" + items);
    items ? () => {items.forEach((item) => {
      sum += parseFloat(item.numberOfUnits);
    });} : () => {setSum(sum)};
    
    setSum(sum);
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
