import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Login from './screens/Login'
import Signup from './screens/signup'
import GameScreen from './screens/GameScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "coral"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export const LoginScreen = ({ navigation }) => (
  <ScreenContainer>
    <Login />
  </ScreenContainer>
);

export const SignupScreen = ({ navigation }) => (
  <ScreenContainer>
    <Signup />
  </ScreenContainer>
);
