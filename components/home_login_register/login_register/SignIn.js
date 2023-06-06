import React , {useState} from 'react'
import {View , Text , TextInput , TouchableOpacity , StyleSheet} from 'react-native'
import { useNavigation} from '@react-navigation/native'
import { firebase } from '../../../config'

const SignIn = () => {
    const navigation = useNavigation();
    const [email , setEmail] = useState('') 
    const [password , setPassword] = useState('') 
 

    loginUser = async (email , password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email , password)
        } catch(error) {
            alert(error.message)
        }
    }

    const ChangePassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Password link recovery sent')
        })
        .catch((error) => {
            alert(error)
        })
    }
    return( 
        <View style={styles.container}>
            <Text>Login</Text>
            <View>
                <TextInput
                style={styles.textInput}
                placeholder='Email'
                onChangeText={(email) => setEmail(email)}
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                />
                <TextInput
                style={styles.textInput}
                placeholder='Password'
                onChangeText={(password) => setPassword(password)}
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
            onPress={() => loginUser(email,password)}
            style={styles.button}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button }
            >
                <Text>Don't have any account yet ? SignUp here </Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {ChangePassword()}}
             style={styles.button}
             >
               
                <Text>Reset password</Text>
            </TouchableOpacity>
        </View>
        )
}


export default SignIn

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