import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

function Dashboard({ route }) {
  const { displayName } = route.params;

  const [name, setName] = useState('');

  // change password 

  const ChangePassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert('Password recovery link sent');
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users')
        .doc(user.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setName(snapshot.data());
          } else {
            console.log('User does not exist');
          }
        })
        .catch((error) => {
          console.log('Error retrieving user data:', error);
        });
    } else {
      console.log('User is not authenticated');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Welcome {displayName}
      </Text>
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
        style={styles.button}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          ChangePassword();
        }}
        style={styles.button}
      >
        <Text>Reset Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
