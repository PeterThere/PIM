import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";

function ModifyMoneyCountPopup(props) {
  const [moneyCount, setMoneyCount] = useState("0");

  const handleMoneyCountChange = (value) => {
    setMoneyCount(value);
  };

  const currencyShortName = props.currencyShortName;
  const isAdd = props.isAdd;
  const isVisible = props.isVisible;

  handleButtonPress = () => {
    numberOfUnits = props.items.filter(
      (item) => item.currencyShortName === currencyShortName
    )[0].numberOfUnits;
    numberOfUnits = isAdd
      ? parseFloat(numberOfUnits) + parseFloat(moneyCount)
      : parseFloat(numberOfUnits) - parseFloat(moneyCount);
    props.updateCurrencyNum(currencyShortName, numberOfUnits);
  };

  const popupStyle = {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "#ccd",
    borderRadius: 20,
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  };

  const xStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 20,
    padding: 10,
    paddingRight: 20,
  };

  const inputStyle = {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: 200,
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={popupStyle}>
      <TouchableOpacity onPress={props.closePopup} style={xStyle}>
        <Text>X</Text>
      </TouchableOpacity>
      <Text>
        {isAdd ? "Add" : "Subtract"} {currencyShortName}
      </Text>
      <TextInput
        placeholder="How much..."
        keyboardType="numeric"
        style={inputStyle}
        onChangeText={handleMoneyCountChange}
        defaultValue={moneyCount} // Set the initial value here
      />
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
}

export default ModifyMoneyCountPopup;
