import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchExchangeRates from "./requests/request";
import TotalSumDisplay from "./Components/totalSumDisplay/totalSumDisplay";
import ScrolledList from "./Components/scrolledList/scrolledList";

export default function App() {
  const fetchRates = async () => {
    const data = await fetchExchangeRates();
    return data;
  };

  const items = ["eur", "usd", "gbp", "chf", "jpy", "aud", "cad", "sek"];

  // fetchRates().then((data) => console.log(data));

  return (
    <View style={styles.container}>
      <ScrolledList items={items} />
    </View>
  );
}
const examples = [
  {
    currencyName: "US Dollar",
    currencyShortName: "USD",
    numberOfUnits: 100,
    targetNumber: 500,
  },
  {
    currencyName: "Euro",
    currencyShortName: "EUR",
    numberOfUnits: 50,
    targetNumber: 1000,
  },
  {
    currencyName: "British Pound",
    currencyShortName: "GBP",
    numberOfUnits: 200,
    targetNumber: 1500,
  },
  {
    currencyName: "Japanese Yen",
    currencyShortName: "JPY",
    numberOfUnits: 5000,
    targetNumber: 20000,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
