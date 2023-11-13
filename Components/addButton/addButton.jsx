import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as data from "../../data/symbols.json";
export const AddButton = () => {
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
      rowTextForSelection={(item, index) => {
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
