import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import Firebase from '../config/Firebase'


const ShopScreen = ({navigation, route}) => {
    // Use States declared
    const [donutData, setDonutData] = useState()
    const [bakeryData, setBakeryData] = useState(1)
    const [update, setUpdate] = useState('')

    // Firebase called
    let db = Firebase.database()
    let donutdb = db.ref('posts' + route.params.user.user_id)
      


    // This is the shop function, when you buy a donut it
    // subtracts the right amount from your dunk count.
    // Also it protects you from going into negative dunks
    // this will trigger an alert.
    const buyDonut = (num) => {
        let newDonutNum
        if (num == 2){
            newDonutNum = parseInt(donutData) - 200
            if (newDonutNum >= 0) {
                addDonuts(newDonutNum, num)
            } else {
                Alert.alert(
                "Not Enough Dunks!",
                "Go Dunk Your Donut!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ],
                { cancelable: false }
              );
            }
        } else if(num == 3) {
            newDonutNum = parseInt(donutData) - 5000
            if (newDonutNum >= 0) {
                addDonuts(newDonutNum, num)
            } else {
                Alert.alert(
                "Not Enough Dunks!",
                "Go Dunk Your Donut!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ],
                { cancelable: false }
              );
            }
        } else {
            newDonutNum = parseInt(donutData) - 1
            if (newDonutNum >= 0) {
                addDonuts(newDonutNum, num)
            } else {
                Alert.alert(
                "Not Enough Dunks!",
                "Go Dunk Your Donut!",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed"), style: "cancel" }
                ],
                { cancelable: false }
              );
            }
        }
    }

    // adds or updates the dunk count and current donut type
    //  put and post route for the database
    const addDonuts = (donutNum, bakeryData) => {
        donutdb.set({
          donuts: donutNum,
          bakeryData: bakeryData,
        })
      }
    
    // calls the database to get the users donut count and donut type
    // get route
    const getDonuts = () => {
      donutdb.once('value') 
        .then(function(snapshot) {
          setDonutData(snapshot.val().donuts)
          setBakeryData(snapshot.val().bakeryDonut)
        })
        .catch((error)=> {
          console.log(error)
        })
    }

    // sets up a setInterval to check the database
    useEffect(() => {
      const interval = setInterval(() => {
          getDonuts()
      }, 1000);
        return () => clearInterval(interval);
    }, [update])

    return(
        <View style={styles.screen}>
            <Text style={styles.donutText}>{donutData}</Text>
            <View style={styles.shopContainer}>
            <TouchableOpacity onPress={() => buyDonut(1)}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Price: 1 Dunk</Text>
                </View>
                <View style={styles.donutContainer}>
                    <Image style={styles.donut}source={require("../assets/donut.png")} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Buy Pink Donut</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.shopContainer}>
                <TouchableOpacity onPress={() => buyDonut(2)}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Price: 200 Dunks</Text>
                    </View>
                    <View style={styles.donutContainer}>
                        <Image style={styles.donut}source={require("../assets/donut2.png")} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Buy Chocolate Donut</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.shopContainer}>
                <TouchableOpacity onPress={() => buyDonut(3)}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>Price: 5000 Dunks</Text>
                    </View>
                    <View style={styles.donutContainer}>
                        <Image style={styles.donut}source={require("../assets/donut3.png")} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}> Buy Purple Chocolate Glaze Donut</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#ffa69e",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    donutText: {
        marginTop: -13,
        color: "#5e6472",
        fontWeight: "900",
        fontSize: 56,
    },
    shopContainer: {
        backgroundColor: "#b8f2e6",
        borderRadius: 50,
        padding: -20,
        margin: 10,
        width: 300,
        height: 140
    },
    donutContainer: {
        margin: 8,
        alignItems: "center",
    },
    textContainer: {
        alignItems: "center",
    },
    text: {
        fontWeight: "bold",
    },
    donut: {
        width: 80,
        height: 80
    }
})

export default ShopScreen