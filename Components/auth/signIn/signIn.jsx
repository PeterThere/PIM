import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const SignInScreen = ({ onSuccessSignIn, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        console.log("User signed in!");
        onSuccessSignIn();
      })
      .catch((error) => {
        console.error("Sign in error:", error);
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
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Back" onPress={() => onCancel()} />
    </View>
  );
};

export default SignInScreen;
