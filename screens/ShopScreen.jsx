import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native'

const ShopScreen = ({navigation, route}) => {
    return(
        <View style={styles.screen}>
            <Text>{route.params.donutCount}</Text>
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