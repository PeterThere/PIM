import React from "react";
import { View, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

const LogoutButton = () => {
  const handleLogout = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        console.log("User signed out");
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
