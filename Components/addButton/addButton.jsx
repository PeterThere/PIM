import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import * as data from "../../data/symbols.json";
export const AddButton = () => {
  return (
    <View>
      <Text>{data.symbols.AED}</Text>
    </View>
  );
};

export default AddButton;
