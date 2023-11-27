import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchExchangeRates from "./requests/request";
import TotalSumDisplay from "./Components/totalSumDisplay/totalSumDisplay";
import ScrolledList from "./Components/scrolledList/scrolledList";
import { useEffect, useState } from "react";
import AddButton from "./Components/addButton/addButton";
import ModifyMoneyCountPopup from "./Components/popUps/modifymoneyCountPopup";
import roundNumber from "./utils/roundNumber";

export default function App() {
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

  const [moneyCurrency, setmoneyCurrency] = useState("PLN");
  const [myCurrenciesBalances, setMyCurrenciesBalances] = useState([]);

  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(false);
  const [popupIsAdd, setPopupIsAdd] = useState(false);
  const [popupCurrencyShortName, setPopupCurrencyShortName] = useState("");

  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    fetchMyCurrenciesBalances();
    fetchRates();
  }, []);

  const updateItems = (items) => {
    setMyCurrenciesBalances(items);
  };

  const updateCurrencyNum = (currencyShortName, numberOfUnits) => {
    hideCurrencyPopUp();
    const newItems = myCurrenciesBalances.map((item) => {
      if (item.currencyShortName === currencyShortName) {
        item.numberOfUnits = roundNumber(numberOfUnits);
      }
      return item;
    });
    updateItems(newItems);
  };

  const showCurrencyPopUp = (isAdd, currencyShortName) => {
    setPopupIsAdd(isAdd);
    setIsCurrencyPopUpVisible(true);
    setPopupCurrencyShortName(currencyShortName);
  };

  const hideCurrencyPopUp = () => {
    setIsCurrencyPopUpVisible(false);
  };

  const changeCurrency = () => {};

  const fetchRates = async () => {
    const data = await fetchExchangeRates();
    setExchangeRates(data.rates);
    return data;
  };

  const calculateSum = (items) => {
    let sum = 0;
    items.forEach((item) => {
      sum += parseFloat(item.numberOfUnits);
    });
    return sum;
  };

  // Run the function every 10 seconds
  setInterval(fetchRates, 10000);

  const fetchMyCurrenciesBalances = () => {
    updateItems(examples);
  };

  // fetchRates().then((data) => console.log(data));

  return (
    <View style={styles.container}>
      <AddButton></AddButton>
      <ModifyMoneyCountPopup
        isVisible={isCurrencyPopUpVisible}
        isAdd={popupIsAdd}
        currencyShortName={popupCurrencyShortName}
        items={myCurrenciesBalances}
        updateCurrencyNum={updateCurrencyNum}
      />
      <ScrolledList
        items={myCurrenciesBalances}
        updateItems={updateItems}
        showCurrencyPopUp={showCurrencyPopUp}
      />
      <TotalSumDisplay
        exchangeRates={exchangeRates}
        items={myCurrenciesBalances}
        currency={moneyCurrency}
        changeCurrency={changeCurrency}
        updateCurrencyNum={updateCurrencyNum}
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
