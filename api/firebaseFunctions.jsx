import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";
import * as data from "../data/symbols.json";
//Tworzy dokument o nazwie {symbol}, z polem value o wartości {value}
export const setCurrencyAmount = async (symbol, value) => {
  await setDoc(doc(FIRESTORE_DB, "rates", symbol), {
    fullName: data.symbols[symbol],
    value: value,
  });
  console.log(symbol + "saved at: " + value);
};

export const getCurrencyObject = async () => {
  let data = {};
  await getDocs(collection(FIRESTORE_DB, "rates")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data[doc.id] = {
        fullName: doc.data().fullName,
        value: doc.data().value,
      };
    });
  });
  // console.log(data);
  return data;
};
