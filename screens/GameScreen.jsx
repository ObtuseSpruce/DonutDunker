import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

const GameOverScreen = props => {
    return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={{color: "#f4acb7", fontWeight: 'bold', fontSize: 100,}}>{props.buttonText}</Text>
        <Button title="Click Me" color="#f4acb7" onPress={() => {props.setButtonText(props.buttonText + 1)}} />
      </View>
    </View>
    )
}
const styles=StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    container: {
      color: 'coral',
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

export default GameOverScreen