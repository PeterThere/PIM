import React, { useEffect } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import roundToTwoDecimalPlaces from "../../utils/roundNumber";
import CurrencyDropdown from "./currenciesDropdown/CurrDropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TotalSumDisplay = (props) => {
  const { currency, items } = props;
  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(false);
  const [sum, setSum] = useState(0);

  const handlePress = () => {
    setIsCurrencyPopUpVisible(!isCurrencyPopUpVisible);
  };

  useEffect(() => {
    calculateSum();
  }, [items, currency]);

  const setCurrency = (currencyShortName) => {
    console.log(currencyShortName);
    props.setCurrency(currencyShortName);
    setIsCurrencyPopUpVisible(false);
  };

  const calculateSum = async () => {
    let sum = 0;
    if (!items) return 0;
    for (const item of items) {
      var baseExchangeRate = await AsyncStorage.getItem(currency);
      var exchangeRate = await AsyncStorage.getItem(item.currencyShortName);

      var temp =
        parseFloat(item.numberOfUnits) *
        parseFloat((1 / exchangeRate) * baseExchangeRate);

      sum += temp ? temp : 0;
    }
    setSum(roundToTwoDecimalPlaces(sum));
  };

  return (
    <View
      style={{
        display: "flex",
        bottom: -5,
        zIndex: 999,
        position: "absolute",
        width: 350,
      }}
    >
      <CurrencyDropdown
        style={{
          backgroundColor: "orange",
          padding: 10,
          margin: 20,
          borderRadius: 10,
        }}
        isCurrencyPopUpVisible={isCurrencyPopUpVisible}
        setCurrency={setCurrency}
      />

      <View
        style={{
          backgroundColor: "orange",
          padding: 10,
          margin: 20,
          borderRadius: 10,
          width: 200,
        }}
      >
        <Pressable onPress={handlePress}>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>You have</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {sum} {currency}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TotalSumDisplay;
