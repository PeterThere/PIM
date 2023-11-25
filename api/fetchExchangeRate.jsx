import axios from "axios";
import { AsyncStorage } from "react-native";

const baseUrl = "https://api.exchangeratesapi.io";

_storeData = async (symbol, rate) => {
  try {
    await AsyncStorage.setItem(symbol, rate);
  } catch (error) {
    console.log("Better luck next time!");
  }
};
//TO DO: change config to accept base, symbols as parameters
const config = {
  url: `${baseUrl}/v1/latest`,
  method: "GET",
  params: {
    access_key: "4ab8f6af98f8b5b3c8dab0b795290a2f",
    base: "PLN",
    symbols: "EUR, USD",
  },
};

axios(config).then((response) => {
  console.log("Response from request: " + response.data);
  response.data.rates.map((symbol, rate) => {
    _storeData(symbol, rate);
    console.log(symbol + "saved at" + rate);
  });
});