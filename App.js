import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import { fetchExchangeRate } from "./api/fetchExchangeRate";
import TotalSumDisplay from "./Components/totalSumDisplay/totalSumDisplay";
import ScrolledList from "./Components/scrolledList/scrolledList";
import { useEffect, useState } from "react";
import AddButton from "./Components/addButton/addButton";
import ModifyMoneyCountPopup from "./Components/popUps/modifymoneyCountPopup";
import roundNumber from "./utils/roundNumber";
import { getCurrencyMap, getBase, setBase } from "./api/firebaseFunctions";
import USureToDeletePopup from "./Components/popUps/uSureDeletePopup";
import LogoutButton from "./Components/auth/logout/logout";
import SignInScreen from "./Components/auth/signIn/signIn";
import SignUpScreen from "./Components/auth/signUp/signUp";
export default function App() {
  const [moneyCurrency, setMoneyCurrency] = useState("PLN");
  const [myCurrenciesBalances, setMyCurrenciesBalances] = useState([]);

  const [isCurrencyPopUpVisible, setIsCurrencyPopUpVisible] = useState(false);
  const [popupIsAdd, setPopupIsAdd] = useState(false);

  const [isPopupSureToDeleteVisible, setIsPopupSureToDeleteVisible] =
    useState(false);

  const [popupCurrencyShortName, setPopupCurrencyShortName] = useState("");

  const setMoneyCurrencyFromBase = async () => {
    const baseCurrency = await getBase();
    setMoneyCurrency(baseCurrency);
  };

  useEffect(() => {
    fetchMyCurrenciesBalances();
    -setMoneyCurrencyFromBase();
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

  const changeCurrency = (newCurrency) => {
    setBase(newCurrency);
    setMoneyCurrency(newCurrency);
    fetchRates(newCurrency);
  };

  const fetchRates = (newCurrency) => {
    let resString = "";
    myCurrenciesBalances.forEach((item) => {
      resString += item.currencyShortName + ", ";
    });

    fetchExchangeRate("", resString);
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

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUpSuccess = () => {
    setIsSignUpVisible(false);
    setIsLoggedIn(true);
  };

  const handleSignInSuccess = () => {
    setIsSignInVisible(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        {isSignUpVisible && (
          <SignUpScreen
            onSuccessSignUp={handleSignUpSuccess}
            onCancel={() => setIsSignUpVisible(false)}
          />
        )}

        {isSignInVisible && (
          <SignInScreen
            onSuccessSignIn={handleSignInSuccess}
            onCancel={() => setIsSignInVisible(false)}
          />
        )}

        {!isSignUpVisible && !isSignInVisible && (
          <View style={styles.authButtons}>
            <Button
              color="orange"
              title="Sign Up"
              onPress={() => setIsSignUpVisible(true)}
            />
            <Button
              color="orange"
              title="Sign In"
              onPress={() => setIsSignInVisible(true)}
            />
          </View>
        )}
      </View>
    );
  }
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
        items={myCurrenciesBalances}
        currency={moneyCurrency}
        updateCurrencyNum={updateCurrencyNum}
        setCurrency={changeCurrency}
        fetchMyCurrenciesBalances={fetchMyCurrenciesBalances}
      />
      <View style={styles.logoutContainer}>
        <LogoutButton onLogout={handleLogout} />
      </View>
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
  logoutContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    bottom: 35,
    left: 140,
  },
  authButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
});
