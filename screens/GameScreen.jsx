import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, Image, TouchableOpacity, Animated, Easing, AsyncStorage} from 'react-native'
import Firebase from '../config/Firebase'


const GameScreen = ({navigation, route}) => {
  const [donuts, setDonuts] = useState(0)
  const [update, setUpdate] = useState('')
  const [bakeryData, setBakeryData] = useState(1)
  const [donutValue, setDonutValue] = useState(1)
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0))
  const [positionvalue, setPositionValue] = useState(new Animated.ValueXY({x: 0, y: 0}))

  // declaring the firebase variables for later calls
  let db = Firebase.database()
  let donutdb = db.ref('posts' + route.params.user.user_id)

  // Built in component for displaying the right donut
  const BakeryPic = () => {
    if(bakeryData == 2){
      setDonutValue(5)
      return(
      <Image style={styles.donut}source={require("../assets/donut2.png")} />
      )
    } else if (bakeryData == 3) {
      setDonutValue(15)
      return(
      <Image style={styles.donut}source={require("../assets/donut3.png")} />
      ) 
    } else {
      setDonutValue(1)
      return(
          <Image style={styles.donut}source={require("../assets/donut.png")} />
      )
      } 
    }
  
  
  // Firebase call to the database, adds a document if there is none,
  // otherwise it updates.
  // PUT and POST
  const addDonuts = (donutNum, bakeryData) => {
      donutdb.set({
        donuts: donutNum,
        bakeryData: bakeryData,
      })
    }
  
  // Firebase call to get the current dunk count and donut type.
  // GET
  const getDonuts = () => {
    donutdb.once('value') 
      .then(function(snapshot) {
        if (snapshot.val().donuts != null && snapshot.val().bakeryData != null){
        setDonuts(snapshot.val().donuts)
        setBakeryData(snapshot.val().bakeryData)
        }
      })
      .catch((error)=> {
        console.log(error)
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getDonuts()
    }, 1000);
      return () => clearInterval(interval);
  }, [update])


  //////////////////////////////////
  /////// ANIMATION FUNCTIONS //////
  //////////////////////////////////

  //handles the rotating movement of the donut
  const handleRotate = () => {
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
  const handleRotateBack = () => {
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

  //handles the downward movement of the donut
  const moveDonut = () => {
    Animated.timing(positionvalue, {
      toValue: {x: 0, y: 150},
      duration: 100,
      useNativeDriver: false
    }).start()
  }

  const moveBack = () => {
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


  // depending on the donut type adds either 1, 5, or 15
  // to the donut count on every tap.
  const donutCountHandler = () => {
    let newDonutNum = donuts + donutValue
    setDonuts(newDonutNum)
    addDonuts(newDonutNum, bakeryData)
  }

  const RotateData = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.screen}>
      <View style={styles.donutCounter}>
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
      marginTop: -132,
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
      marginTop: 60,
      width: 300,
      height: 300,
    }
})

export default GameScreen