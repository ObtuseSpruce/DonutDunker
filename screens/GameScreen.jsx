import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated, Easing} from 'react-native'
import Firebase from '../config/Firebase'


const GameScreen = ({navigation, route}) => {
  const [donuts, setDonuts] = useState(0)
  const [update, setUpdate] = useState('')
  const [positionvalue, setPositionValue] = useState(new Animated.ValueXY({x: -90, y: -250}))
  const [rotateValue, setRotateValue] = useState(new Animated.Value(1))

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
  }, [update])

  function handleRotate() {
    Animated.loop(
    Animated.timing(
    rotateValue,
      {
       toValue: 1,
       duration: 1000,
       easing: Easing.linear,
       useNativeDriver: true
      }
    )
   ).start()
}
function handleRotateBack() {
  Animated.timing(
  rotateValue,
    {
     toValue: 0,
     duration: 1,
     easing: Easing.linear,
     useNativeDriver: true
    }
  
 ).start()
}
  
  function moveDonut() {
    Animated.timing(positionvalue, {
      toValue: {x: -90, y: -100},
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  function moveBack() {
    Animated.timing(positionvalue, {
      toValue: {x: -90, y: -250},
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.screen}>
      <Text>{donuts}</Text>
        <TouchableOpacity style={styles.container} activeOpacity={.9} onPress={() => setDonuts(donuts + 1)} onPressIn={handleRotate} onPressOut={handleRotateBack}>
        <Image style={styles.cupBehind}source={require('../assets/cupBehind2.png')} />
        <Animated.View style={positionvalue.getLayout()}>
          <Animated.View style={{transform: [{ rotate: RotateData }]}}>
            <Image style={styles.donut}source={require('../assets/donut.png')} />
          </Animated.View>
        </Animated.View>
      <Image style={styles.cupFront}source={require('../assets/cupFront2.png')} />
    </TouchableOpacity>
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
      position: "absolute",
      height: "100%",
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    donut: {
      width: 180,
      height: 180,
      
    },
    cupFront: {
      marginVertical: -100,
      position: "relative",
      width: 300,
      height: 300,
    },
    cupBehind: {  
      marginVertical: -107,
      position: "relative",
      width: 300,
      height: 300,
    }
})

export default GameScreen