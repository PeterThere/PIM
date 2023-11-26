import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebaseConfig";

export const setCurrencyAmount = async (symbol, value) => {
  await setDoc(doc(FIRESTORE_DB, "rates", symbol), {
    value: value,
  });
  console.log(symbol + "saved at: " + value);
};
// WIP
// export const getCurrencyList = async () => {
//   const docSnap = await getDocs(collection(FIRESTORE_DB, "rates"));
//   if (docSnap) {
//     console.log("Waluty:", docSnap);
//   }
// };
