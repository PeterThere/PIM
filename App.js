import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchExchangeRates from "./requests/request";

export default function App() {
  const fetchRates = async () => {
    const data = await fetchExchangeRates();
    return data;
  };

  fetchRates().then((data) => console.log(data));

  return (
    <View style={styles.container}>
      <Text>TEKST</Text>
      <StatusBar style="auto" />
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
