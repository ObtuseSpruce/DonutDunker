import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Donut Dunker</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        marginTop: 25,
        width: "100%",
        height: 90,
        paddingTop: 10,
        backgroundColor: '#f7287b',
        alignItems: "center",
        justifyContent: "center"
    },
    headerText:{
        color: "black",
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default Header