import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "http://api.exchangeratesapi.io";

_storeData = async (symbol, rate) => {
  try {
    //nie zapisuje
    await AsyncStorage.setItem(symbol, String(rate));
    console.log(symbol + " saved at " + rate);
  } catch (error) {
    console.log("Better luck next time!");
  }
};

export const fetchExchangeRate = async (symbolsList) => {
  axios({
    url: `${baseUrl}/v1/latest`,
    method: "GET",
    params: {
      access_key: "4ab8f6af98f8b5b3c8dab0b795290a2f",
      base: "",
      symbols: symbolsList,
    },
  }).then((response) => {
    console.log(
      "Response from request: " + JSON.stringify(response.data.rates)
    );
    Object.entries(response.data.rates).forEach(([symbol, rate]) => {
      _storeData(symbol, rate);
    });
  });
};
