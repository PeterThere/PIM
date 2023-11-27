import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import fetchExchangeRates from "./requests/request";
import TotalSumDisplay from "./Components/totalSumDisplay/totalSumDisplay";
import ScrolledList from "./Components/scrolledList/scrolledList";
import { useEffect, useState } from "react";
import AddButton from "./Components/addButton/addButton";
import ModifyMoneyCountPopup from "./Components/popUps/modifymoneyCountPopup";
import roundNumber from "./utils/roundNumber";
import { getCurrencyMap } from "./api/firebaseFunctions";

export default function App() {
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

  const changeCurrency = (currencyShortName) => {
    setmoneyCurrency(currencyShortName);
  };

  const fetchRates = async () => {
    console.log("fetching rates");
    const data = await fetchExchangeRates();
    setExchangeRates(data.rates);
    return data;
  };

  // Run the function every 10 seconds
  setInterval(fetchRates, 910000);

  const fetchMyCurrenciesBalances = () => {
    var currBalances = [];
    getCurrencyMap().then((data) => {
      data.forEach((value, key) => {
        currBalances.push({
          currencyName: "JP2",
          currencyShortName: key,
          numberOfUnits: value,
        });
      });
      setMyCurrenciesBalances(currBalances);
    });
  };

  return (
    <View style={styles.container}>
      <AddButton />
      <ModifyMoneyCountPopup
        isVisible={isCurrencyPopUpVisible}
        isAdd={popupIsAdd}
        currencyShortName={popupCurrencyShortName}
        items={myCurrenciesBalances}
        updateCurrencyNum={updateCurrencyNum}
        closePopup={hideCurrencyPopUp}
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
