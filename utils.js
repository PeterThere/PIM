const roundToTwoDecimalPlaces = (value) => {
  if (typeof value === "number") {
    // Jeśli wartość jest liczbą, zaokrąglij do dwóch miejsc po przecinku
    return Math.round(value * 100) / 100;
  } else if (typeof value === "string") {
    // Jeśli wartość jest ciągiem znaków, przekształć go na liczbę i zaokrąglij
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return Math.round(numericValue * 100) / 100;
    } else {
      console.error("Nieprawidłowa wartość dla zaokrąglenia: ", value);
      return NaN;
    }
  } else {
    console.error("Nieprawidłowy typ wartości: ", value);
    return NaN;
  }
};

export default roundToTwoDecimalPlaces;
