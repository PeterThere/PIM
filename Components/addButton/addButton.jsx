import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as data from "../../data/symbols.json";
import { setCurrencyAmount } from "../../api/firebaseFunctions";
export const AddButton = (props) => {
  const fetchMyBalances = () => {
    props.fetchMyCurrenciesBalances();
  };

  return (
    <View style={{ marginTop: 120 }}>
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "orange",
          padding: 10,
          borderRadius: 10,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: "10%",
        }}
      >
        Add new currency
      </Text>
      <SelectDropdown
        data={Object.keys(data.symbols)}
        onSelect={(selectedItem) => {
          //Tutaj można jakiegoś ładnego prompta jebnąć w sumie
          setCurrencyAmount(selectedItem, 0);
          fetchMyBalances();
        }}
        defaultButtonText={"Select new currency"}
        buttonTextAfterSelection={(selectedItem) => {
          return selectedItem;
        }}
        rowTextForSelection={(item) => {
          return item;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        selectedRowStyle={styles.dropdown1SelectedRowStyle}
        search
        searchInputStyle={styles.dropdown1searchInputStyleStyle}
        searchPlaceHolder={"Search here"}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        searchPlaceHolderColor={"darkgrey"}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={"search"} color={"#444"} size={18} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1SelectedRowStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
  dropdown1searchInputStyleStyle: {
    backgroundColor: "#EFEFEF",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
});

export default AddButton;
