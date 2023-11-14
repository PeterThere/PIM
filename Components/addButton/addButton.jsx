import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as data from "../../data/symbols.json";
export const AddButton = () => {
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  return (
    <SelectDropdown
      data={data.symbols}
      onSelect={(selectedItem) => {
        console.log(selectedItem);
      }}
      defaultButtonText={"Select country"}
      buttonTextAfterSelection={(selectedItem) => {
        return selectedItem;
      }}
      rowTextForSelection={(item) => {
        return item;
      }}
      search
      renderDropdownIcon={(isOpened) => {
        return (
          <FontAwesome
            name={isOpened ? "chevron-up" : "chevron-down"}
            color={"#444"}
            size={18}
          />
        );
      }}
      dropdownIconPosition={"right"}
      searchPlaceHolder={"Search here"}
      searchPlaceHolderColor={"darkgrey"}
      renderSearchInputLeftIcon={() => {
        return <FontAwesome name={"search"} color={"#444"} size={18} />;
      }}
    />
  );
};

export default AddButton;
