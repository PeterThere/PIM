import React, { useState } from "react";

function ModifyMoneyCountPopup(props) {
  const [moneyCount, setMoneyCount] = useState(0);

  const handleMoneyCountChange = (event) => {
    setMoneyCount(parseFloat(event.target.value));
  };

  const popupStyle = {
    zIndex: 999,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  };

  if (!props.isVisible) {
    return null;
  }

  return (
    <div style={popupStyle}>
      <h2>Modify Money Count</h2>
      <input
        type="number"
        step="0.01"
        value={moneyCount}
        onChange={handleMoneyCountChange}
      />
      <button onClick={() => props.onSave(moneyCount)}>Save</button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
  );
}

export default ModifyMoneyCountPopup;
