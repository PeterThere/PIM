import React from "react";
import { Text, View } from "react-native";

class CurrencyListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyName: props.currencyName,
      currencyShortName: props.currencyShortName,
      numberOfUnits: props.numberOfUnits,
      targetNumber: props.targetNumber,
    };
  }

  render() {
    return (
      <View style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}>
        <Text>Currency Name: {this.state.currencyName}</Text>
        <Text>Currency Short Name: {this.state.currencyShortName}</Text>
        <Text>Number of Units: {this.state.numberOfUnits}</Text>
        <Text>Target Number: {this.state.targetNumber}</Text>
      </View>
    );
  }
}

export default CurrencyListElement;
