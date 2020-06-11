import React, {useState} from 'react';
import { StyleSheet,
        Text,
        View,
        Button
      } from 'react-native';
import Header from './components/Header'    
import GameScreen from './screens/GameScreen'  
import Login from './screens/Login'  


export default function App() {
  const [buttonText, setButtonText] = useState(0)

  return (
    <View style={styles.screen}>
      <Header />
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
      flex: 1,
  }
});
