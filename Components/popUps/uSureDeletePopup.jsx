import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { deleteCurrency } from "../../api/firebaseFunctions";

function USureDeletePopup(props) {
  const { isVisible, currencyToDelete } = props;

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

  const textStyle = {
    fontSize: 20,
    fontWeight: "bold",
  };

  const handleXPress = () => {
    props.setIsPopupSureToDeleteVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const handleButtonPress = () => {
    console.log(currencyToDelete);
    deleteCurrency(currencyToDelete);
    props.fetchMyCurrenciesBalances();
    props.setIsPopupSureToDeleteVisible(false);
  };

  return (
    <View style={popupStyle}>
      <TouchableOpacity onPress={handleXPress} style={xStyle}>
        <Text>X</Text>
      </TouchableOpacity>
      <Text style={textStyle}>Are you sure you want to</Text>
      <Text style={textStyle}>
        delete your money in {props.currencyToDelete}
      </Text>
      <Button
        title="Delete"
        onPress={handleButtonPress}
        color={"black"}
        // style={{ marginTop: 20 }}
      />
    </View>
  );
}

export default USureDeletePopup;
