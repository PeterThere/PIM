import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchExchangeRates from "./requests/request";
import TotalSumDisplay from "./Components/totalSumDisplay/totalSumDisplay";
import ScrolledList from "./Components/scrolledList/scrolledList";
import { useEffect, useState } from "react";
import CurrencyPopUp from "./Components/popUps/currencyPopUp";

export default function App() {
  const [moneySumInOneCurrency, setMoneySumInOneCurrency] = useState(0);
  const [moneyCurrency, setmoneyCurrency] = useState("PLN");
  const [myCurrenciesBalances, setMyCurrenciesBalances] = useState([]);
  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(true);

  useEffect(() => {
    fetchMyCurrenciesBalances();
  }, []);

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

  const changeCurrency = () => {};

  const fetchRates = async () => {
    const data = await fetchExchangeRates();
    return data;
  };

  const calculateSum = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum += item.numberOfUnits;
    });
    return sum;
  };

  const fetchMyCurrenciesBalances = () => {
    setMyCurrenciesBalances(examples);
    setMoneySumInOneCurrency(calculateSum(examples));
  };

  // fetchRates().then((data) => console.log(data));

  return (
    <View style={styles.container}>
      <CurrencyPopUp isVisible={isCurrencyPopUpVisible} />
      <ScrolledList items={myCurrenciesBalances} />
      <TotalSumDisplay
        sum={moneySumInOneCurrency}
        currency={moneyCurrency}
        changeCurrency={changeCurrency}
      />
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
