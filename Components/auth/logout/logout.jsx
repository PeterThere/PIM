import React from "react";
import { View, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        console.log("User signed out");
        onLogout();
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutButton;
