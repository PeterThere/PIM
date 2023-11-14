import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import ManageMoneyButton from "./listElementButtons/manageMoneyButton";
import Icon from "react-native-vector-icons/FontAwesome";

const CurrencyListElement = (props) => {
  const handleDelete = () => {
    props.onDelete(props.currencyShortName);
  };

  return (
    <View
      style={{
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <TouchableOpacity onPress={handleDelete}>
        <View style={{ marginRight: 10 }}>
          <Icon name="trash" size={20} color="#000" />
        </View>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        {props.currencyShortName} {props.numberOfUnits}
      </Text>
      <View style={{ position: "relative" }}>
        <ManageMoneyButton
          isAdd={true}
          style={{ position: "absolute", right: 0 }}
        />
        <ManageMoneyButton style={{ position: "absolute", right: 40 }} />
      </View>
    </View>
  );
};

export default CurrencyListElement;
