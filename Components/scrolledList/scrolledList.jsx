import React from "react";
import { ScrollView, View } from "react-native";
import CurrencyListElement from "./currencyListElement/currencyListElement";
import { number } from "yargs";

const ScrolledList = (props) => {
  const diffNumber = 0;
  const updateCurrencyNumber = (currencyShortName, isAdd) => {
    numberOfUnits = props.items.filter(
      (item) => item.currencyShortName === currencyShortName
    )[0].numberOfUnits;

    numberOfUnits = isAdd
      ? numberOfUnits + diffNumber
      : numberOfUnits - diffNumber;
    props.updateCurrencyNum(currencyShortName);
  };
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
