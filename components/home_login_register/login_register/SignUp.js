import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const handleValidation = () => {
    let formIsValid = true;
    const errorsCopy = { ...errors };

    // Vérification du champ username
    if (!username) {
      errorsCopy.username = 'Le champ username est requis';
    } else if (username.length < 3) {
      errorsCopy.username = 'Le champ username requis au moins 3 caractères';
    }

    // Vérification du champ Email
    if (!email) {
      errorsCopy.email = 'Le champ Email est requis.';
      formIsValid = false;
    } else {
      errorsCopy.email = '';
    }

    // Vérification du champ Mot de passe
    if (!password) {
      errorsCopy.password = 'Le champ Mot de passe est requis.';
      formIsValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
      errorsCopy.password =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre';
      formIsValid = false;
    } else {
      errorsCopy.password = '';
    }

    // Vérification du champ Confirmation de mot de passe
    if (!confirmPassword) {
      errorsCopy.confirmPassword = 'Le champ Confirmation de mot de passe est requis.';
      formIsValid = false;
    } else if (password !== confirmPassword) {
      errorsCopy.confirmPassword = 'Les mots de passe ne correspondent pas.';
      formIsValid = false;
    } else {
      errorsCopy.confirmPassword = '';
    }

    setErrors(errorsCopy);
    return formIsValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      signUpUser(email, password, username, confirmPassword);
    }
  };

  const signUpUser = async (email, password, username, confirmPassword) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://euro-5bfbd.firebaseapp.com',
          })
          .then(() => {
            alert('Verification email sent');
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({ 
                username,
                email,
            })
              .catch((error) => {
                alert(error.message);
              });
          });
      });
  };

  return (
    <View style={styles.container}>
      <Text>SignUp</Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          autoCorrect={false}
        />
        {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        <TextInput
          style={styles.textInput}
          placeholder="Confirm your password"
          onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        {errors.confirmPassword ? (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        ) : null}
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text>Already had an account? SignIn here</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUp;

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