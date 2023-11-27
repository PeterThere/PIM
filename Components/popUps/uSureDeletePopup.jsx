import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";

function USureDeletePopup(props) {
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

  if (!isVisible) {
    return null;
  }

  return (
    <View style={popupStyle}>
      <Button title="Submit" onPress={handleButtonPress} />
    </View>
  );
}

export default ModifyMoneyCountPopup;
