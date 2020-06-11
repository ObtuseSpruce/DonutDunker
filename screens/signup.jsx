import React, {useState} from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Firebase from '../config/Firebase'

const Signup = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    handleSignUp = () => {
        const { email, password } = this.state
        Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
            console.log('you signed up!')
        })
        .catch(error => console.log(error))
    }

    const emailInputHandler = (inputText) => {
        setEmail(inputText)
    }
    const passInputHandler = (inputText) => {
        setPassword(inputText)
    }
    const nameInputHandler = (inputText) => {
        setName(inputText)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={name}
                onChangeText={nameInputHandler}
                placeholder='Full Name'
            />
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={emailInputHandler}
                placeholder='Email'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={passInputHandler}
                placeholder='Password'
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Signup