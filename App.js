import React, {useState, useEffect} from 'react';
import { StyleSheet,
      Text,
      View,
      Button
  } from 'react-native';
import jwtDecode from 'jwt-decode'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login'
import Signup from './screens/signup'
import GameScreen from './screens/GameScreen'



export default function App() {

  
  const [buttonText, setButtonText] = useState("hello")
  const [token, setToken] = useState('')
  const [user, setUser] = useState('')
  

  const decodeToken = () => {
    if (token) {
      let decodeUser = jwtDecode(token)
      if(!decodeUser || Date.now() > decodeUser.exp * 1000){
        console.log('expired or bad token')
        setUser(null)
      } else {
        console.log('user and token good!')
        setUser(decodeUser)
      }
    } else {
      console.log('no token found')
      setUser(null)
    }
  }
  const LoginStack = createStackNavigator()
  const GameStack = createStackNavigator()
  const Tabs = createBottomTabNavigator()

  const LoginStackScreen = () => (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={Login} initialParams={{ setToken: setToken, buttonText: buttonText, setButtonText: setButtonText }} />
      <LoginStack.Screen name="Signup" component={Signup} initialParams={{ setToken: setToken }} />
    </LoginStack.Navigator>
  )
  
  const GameStackScreen = () => (
    <GameStack.Navigator>
      <GameStack.Screen name="Donut Dunker" component={GameScreen} />
    </GameStack.Navigator>
  )

  let content

  if (!user) {
    content = LoginStackScreen
  } else {
    content = GameStackScreen
  }

  useEffect(() => {
    decodeToken()
  },[token])


  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen name="Donut Dunker" component={content} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
