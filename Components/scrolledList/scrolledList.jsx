import React from "react";
import { ScrollView, View } from "react-native";
import CurrencyListElement from "./currencyListElement/currencyListElement";

const ScrolledList = ({ items }) => {
  return (
    <ScrollView>
      <View>
        {items.map((item, index) => (
          <CurrencyListElement
            key={index}
            currencyName={item.currencyName}
            currencyShortName={item.currencyShortName}
            numberOfUnits={item.numberOfUnits}
            targetNumber={item.targetNumber}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ScrolledList;
