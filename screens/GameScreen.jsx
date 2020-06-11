import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

const GameScreen = props => {
    return (
    <View style={styles.screen}>
      <Text>you did it</Text>
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

export default GameScreen