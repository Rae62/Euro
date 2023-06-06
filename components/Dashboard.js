import React, { useState , useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

function Dashboard() {
    const [name , setName] = useState('');

    // change password 

    const ChangePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert('Password link recovery sent')
        })
        .catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            } else {
                console.log('users does not exist');
            }
        })
    } , [])

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                Welcome {name.username}
            </Text>
            <TouchableOpacity
             onPress={() => {firebase.auth().signOut()}}
             style={styles.button}
             >
               
                <Text>SignOut</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {ChangePassword()}}
             style={styles.button}
             >
               
                <Text>Reset password</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard


const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    textInput: {
        paddingTop:20,
        paddingBottom:10,
        width:400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center',
    },
    button: {
        marginTop:50,
        height:70,
        width:250,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,

    },
})