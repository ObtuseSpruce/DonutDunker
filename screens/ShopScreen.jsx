import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Firebase from '../config/Firebase'


const ShopScreen = ({navigation, route}) => {
    const [donutData, setDonutData] = useState()
    const [bakeryData, setBakeryData] = useState(1)
    const [donutPrice, setDonutPrice] = useState(1)
    const [update, setUpdate] = useState('')

    let db = Firebase.database()
    let donutdb = db.ref('posts' + route.params.user.user_id)
    
    // const getData = async () => { 
    // try {
    //     const value = await AsyncStorage.getItem('DonutNum')
    //     if(value !== null) {
    //         setDonutData(value)
    //     }
    //     } catch(e) {
    //     // error reading value
    //     }
    // }
    // const getBakeData = async () => { 
    //     try {
    //         const value = await AsyncStorage.getItem('BakeryData')
    //         if(value !== null) {
    //             setBakeryDonut(value)
    //         }
    //         } catch(e) {
    //         // error reading value
    //         }
    //     }
    // const storeData = async () => {
    //     let newNum = parseInt(donutData) + parseInt(donutPrice)
    //     try {
    //       await AsyncStorage.setItem('DonutNum', `${newNum}`)
    //     } catch (error) {
    //       // Error saving data
    //     }
    //   };

    // const storeBakeData = async () => {
    //     try {
    //         await AsyncStorage.setItem('BakeryData', `${bakeryData}`)
    //     } catch (error) {
    //         // Error saving data
    //     }
    // };

    const handleSetDonutNum = (num) => {
        if (num == 2){
            setDonutPrice(200)
        } else if(num == 3) {
            setDonutPrice(1000)
        }
    }
      

    const buyDonut = (num) => {
        let newDonutNum
        if (num == 2){
            newDonutNum = parseInt(donutData) - 200
            console.log(newDonutNum)
            addDonuts(newDonutNum, num)
        } else if(num == 3) {
            newDonutNum = parseInt(donutData) - 1000
            console.log(newDonutNum)
            addDonuts(newDonutNum, num)
        } else {
            newDonutNum = parseInt(donutData) - 1
            console.log(newDonutNum)
            addDonuts(newDonutNum, num)
        }
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getData()
    //         getBakeData()
    //     }, 1000);
    //       return () => clearInterval(interval);
    //     }, [])


    const addDonuts = (donutNum, bakeryData) => {
        donutdb.set({
          donuts: donutNum,
          bakeryData: bakeryData,
        })
      }
      
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