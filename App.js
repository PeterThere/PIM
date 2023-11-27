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
import USureToDeletePopup from "./Components/popUps/uSureDeletePopup";

export default function App() {
  const [moneyCurrency, setmoneyCurrency] = useState("PLN");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [myCurrenciesBalances, setMyCurrenciesBalances] = useState([]);

  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(false);
  const [popupIsAdd, setPopupIsAdd] = useState(false);

  const [isPopupSureToDeleteVisible, setIsPopupSureToDeleteVisible] =
    useState(false);

  const [popupCurrencyShortName, setPopupCurrencyShortName] = useState("");

  useEffect(() => {
    fetchMyCurrenciesBalances();
    fetchRates();
  }, []);

  const updateItems = (items) => {
    setMyCurrenciesBalances(items);
  };

  const updateCurrencyNum = (currencyShortName, numberOfUnits) => {
    setIsCurrencyPopUpVisible(false);
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

  const changeCurrency = (currencyShortName) => {
    setmoneyCurrency(currencyShortName);
  };

  const fetchRates = async () => {
    console.log("fetching rates");
    const data = await fetchExchangeRates();
    setExchangeRates(data.rates);
    return data;
  };

  const onItemDelete = (currShortName) => {
    setPopupCurrencyShortName(currShortName);
    setIsPopupSureToDeleteVisible(true);
  };

  // Run the function every 10 seconds
  // setInterval(fetchRates, 10000);

  const fetchMyCurrenciesBalances = () => {
    var currBalances = [];
    getCurrencyMap().then((data) => {
      Object.entries(data).forEach((entry) => {
        currBalances.push({
          currencyShortName: entry[0],
          currencyName: entry[1]["fullName"],
          numberOfUnits: entry[1]["value"],
        });
      });
      setMyCurrenciesBalances(currBalances);
    });
  };

  return (
    <View style={styles.container}>
      <AddButton fetchMyCurrenciesBalances={fetchMyCurrenciesBalances} />
      <ModifyMoneyCountPopup
        isVisible={isCurrencyPopUpVisible}
        isAdd={popupIsAdd}
        currencyShortName={popupCurrencyShortName}
        items={myCurrenciesBalances}
        updateCurrencyNum={updateCurrencyNum}
        setIsCurrencyPopUpVisible={setIsCurrencyPopUpVisible}
      />
      <USureToDeletePopup
        fetchMyCurrenciesBalances={fetchMyCurrenciesBalances}
        isVisible={isPopupSureToDeleteVisible}
        setIsPopupSureToDeleteVisible={setIsPopupSureToDeleteVisible}
        currencyToDelete={popupCurrencyShortName}
      />
      <ScrolledList
        items={myCurrenciesBalances}
        updateItems={updateItems}
        showCurrencyPopUp={showCurrencyPopUp}
        onItemDelete={onItemDelete}
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
