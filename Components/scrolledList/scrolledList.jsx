import React from "react";
import { ScrollView, View } from "react-native";
import CurrencyListElement from "./currencyListElement/currencyListElement";

const ScrolledList = (props) => {
  const onDelete = (currencyShortName) => {
    props.onItemDelete(currencyShortName);
  };

  return (
    <View>
      <ScrollView style={{ marginTop: 5, marginBottom: 200 }}>
        <View>
          {props.items.map((item, index) => (
            <CurrencyListElement
              key={index}
              currencyName={item.currencyName}
              currencyShortName={item.currencyShortName}
              numberOfUnits={item.numberOfUnits}
              targetNumber={item.targetNumber}
              onDelete={onDelete}
              showCurrencyPopUp={props.showCurrencyPopUp}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScrolledList;
