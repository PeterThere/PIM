import React from "react";
import { ScrollView, View } from "react-native";
import CurrencyListElement from "./currencyListElement/currencyListElement";

const ScrolledList = (props) => {
  const onDelete = (currencyShortName) => {
    props.updateItems(
      props.items.filter((item) => item.currencyShortName !== currencyShortName)
    );
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 20 }}>
        {props.items.map((item, index) => (
          <CurrencyListElement
            key={index}
            currencyName={item.currencyName}
            currencyShortName={item.currencyShortName}
            numberOfUnits={item.numberOfUnits}
            targetNumber={item.targetNumber}
            onDelete={onDelete}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ScrolledList;
