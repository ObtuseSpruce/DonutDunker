import React, {useState} from 'react';
import { StyleSheet,
        Text,
        View,
        Button
      } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login'
import Signup from './screens/signup'
import GameScreen from './screens/GameScreen'




const LoginStack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const LoginStackScreen = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen name="Login" component={Login} />
    <LoginStack.Screen name="Signup" component={Signup} />
  </LoginStack.Navigator>
)

const GameStackScreen = () => {
  <GameStack.Navigator>
    <GameStack.Screen name="Donut Dunker" component={GameScreen} />
  </GameStack.Navigator>
}

let content



export default function App() {
  const [buttonText, setButtonText] = useState(0)
  const [user, setUser] = useState('')

  if (!user) {
    content = LoginStackScreen
  } else {
    content = GameStackScreen
  }

  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Login" component={content} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
