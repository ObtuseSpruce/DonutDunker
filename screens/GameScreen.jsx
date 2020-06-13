import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated, Easing} from 'react-native'
import Firebase from '../config/Firebase'


const GameScreen = ({navigation, route}) => {
  const [donuts, setDonuts] = useState(0)
  const [bakeryDonut, setBakeryDonut] = useState(1)
  const [update, setUpdate] = useState('')
  const [positionvalue, setPositionValue] = useState(new Animated.ValueXY({x: 0, y: 0}))
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0))


  

  const BakeryPic = () => {
    if (donuts > 1000){
    return(
        <Image style={styles.donut}source={require("../assets/donut2.png")} />
    )
    } else{
      return(
      <Image style={styles.donut}source={require("../assets/donut.png")} />
      )
    }
    }
  

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
      .catch((error)=> {
        console.log(error)
      })

    
  }, [update])

  function handleRotate() {
    Animated.loop(
    Animated.timing(
    rotateValue,
      {
       toValue: 2,
       duration: 300,
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
     toValue: 4,
     duration: 300,
     easing: Easing.linear,
     useNativeDriver: true
    }
  
 ).start()
}
  
  function moveDonut() {
    Animated.timing(positionvalue, {
      toValue: {x: 0, y: 150},
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  function moveBack() {
    Animated.timing(positionvalue, {
      toValue: {x: 0, y: 0},
      duration: 150,
      useNativeDriver: false
    }).start()
  }

  const handleDonutAnim = () => {
    moveDonut()
    handleRotate()
  }
  const handlePressOutAnim = () => {
    moveBack()
    handleRotateBack()
  }

  const donutCountHandler = () => {
    let newDonutNum = donuts + 1
    setDonuts(newDonutNum)
    if (donuts % 5 == 0 && donuts > 0) {
      route.params.setDonutCount(newDonutNum)
      addDonuts(donuts)
    }
  }


  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.screen}>
      <View style={styles.donutCounter}>
        <Text>Dunk Counter:</Text>
        <Text style={styles.donutText}>{donuts}</Text>
      </View>
      <Image style={styles.cupBehind}source={require('../assets/cupBehind2.png')} />
      <TouchableOpacity style={styles.container} activeOpacity={1} onPress={donutCountHandler} onPressIn={handleDonutAnim} onPressOut={handlePressOutAnim}>
      <Animated.View style={positionvalue.getLayout()}>
        <Animated.View style={{transform: [{rotate: rotateValue}]}}>
          <BakeryPic />
        </Animated.View>
      </Animated.View>  
      <View style={styles.cupContainer}>
        <Image style={styles.cupFront} source={require('../assets/cupFront2.png')} />
      </View>

    </TouchableOpacity>
    </View>
    )
}
const styles=StyleSheet.create({
    screen: {
      backgroundColor: "#b8f2e6",
      flex: 1,
      justifyContent: "center",
      alignItems: 'center'
    },
    donutCounter: {
      alignItems: "center",
      marginTop: -150,
    },
    donutText: {
      color: "#5e6472",
      fontWeight: "900",
      fontSize: 56,
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
    cupContainer: {
      margin: 50
    },
    cupFront: {
      padding: 100,
      marginVertical: -110,
      width: 300,
      height: 300,
    },
    cupBehind: {  
      marginTop: 61,
      width: 300,
      height: 300,
    }
})

export default GameScreen