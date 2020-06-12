import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import Firebase from '../config/Firebase'



const GameScreen = ({navigation, route}) => {
  const [donuts, setDonuts] = useState(0)

  console.log(route.params.user)
  let db = Firebase.database()
  let donutdb = db.ref('posts' + route.params.user.user_id)

  const addDonuts = (donutNum) => {
      donutdb.set({
        donuts: donutNum,
        // createdAt: db.FieldValue.serverTimeStamp
      })
    }

  useEffect(() => {
      donutdb.once('value') 
      .then(function(snapshot) {
        setDonuts(snapshot.val().donuts)
      })
  })

  return (
    <View style={styles.screen}>
      <Text>{donuts}</Text>
      <Button title="Donuts" onPress={()=> setDonuts(donuts + 1)} />
      <Button title="send to server!" onPress={()=> addDonuts(donuts)} />

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