import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

//Tworzy dokument o nazwie {symbol}, z polem value o wartości {value}
export const setCurrencyAmount = async (symbol, value) => {
  await setDoc(doc(FIRESTORE_DB, "rates", symbol), {
    value: value,
  });
  console.log(symbol + "saved at: " + value);
};

//Zwraca mapę z kluczem(symbol waluty) i wartością(ilość waluty w skarbonce) eg. {"PLN" => 100}
export const getCurrencyMap = async () => {
  const data = new Map();
  await getDocs(collection(FIRESTORE_DB, "rates")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.set(doc.id, doc.data().value);
    });
  });
  console.log(data);
  return data;
};
