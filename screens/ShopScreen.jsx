import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, AsyncStorage} from 'react-native'
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
            <Text>{donutData}</Text>
            <Text>Pink Donut</Text>
            <Button title="Buy Pink Donut" onPress={() => buyDonut(1)}/>
            <Button title="Buy Chocolate Donut 200" onPress={() => buyDonut(2)}/>
            <Button title="Buy Purple Donut 5000" onPress={() => buyDonut(3)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default ShopScreen