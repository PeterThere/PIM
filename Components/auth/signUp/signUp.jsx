import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
const SignUpScreen = ({ onSuccessSignUp, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        console.log("User signed up!");
        onSuccessSignUp();
      })
      .catch((error) => {
        console.error("Sign up error:", error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back" onPress={() => onCancel()} />
    </View>
  );
};

export default SignUpScreen;
