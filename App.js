import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchExchangeRates from "./requests/request";
import TotalSumDisplay from "./Components/totalSumDisplay/totalSumDisplay";
import ScrolledList from "./Components/scrolledList/scrolledList";
import { useState } from "react";

export default function App() {
  const [moneySumInOneCurrency, setMoneySumInOneCurrency] = useState(0);
  const [moneyCurrency, setmoneyCurrency] = useState("PLN");

  const fetchRates = async () => {
    const data = await fetchExchangeRates();
    return data;
  };

  const examples = [
    {
      currencyName: "Canadian Dollar",
      currencyShortName: "CAD",
      numberOfUnits: 150,
    },
    {
      currencyName: "Swiss Franc",
      currencyShortName: "CHF",
      numberOfUnits: 75,
    },
    {
      currencyName: "Australian Dollar",
      currencyShortName: "AUD",
      numberOfUnits: 300,
    },
    {
      currencyName: "New Zealand Dollar",
      currencyShortName: "NZD",
      numberOfUnits: 250,
    },
    {
      currencyName: "Mexican Peso",
      currencyShortName: "MXN",
      numberOfUnits: 1000,
    },
    {
      currencyName: "Chinese Yuan",
      currencyShortName: "CNY",
      numberOfUnits: 800,
    },
  ];

  // fetchRates().then((data) => console.log(data));

  return (
    <View style={styles.container}>
      <ScrolledList items={examples} />
      <TotalSumDisplay sum={moneySumInOneCurrency} currency={moneyCurrency} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
