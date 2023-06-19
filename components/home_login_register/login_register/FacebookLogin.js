import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebase } from '../../../config';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import du hook useNavigation

export default function FacebookLogin() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null); // Initialisez user avec null

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (initializing) setInitializing(false);
      setUser(user);
    });
    return subscriber;
  }, []);

  const signInWithFB = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']);
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        return;
      }
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
      const auth = getAuth();
      const response = await signInWithCredential(firebase.auth(), facebookCredential);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Sign in with Facebook </Text>
        <Button title='Sign in with Facebook' onPress={signInWithFB} />
      </View>
    );
  }

  const navigation = useNavigation(); // Obtenez l'objet de navigation

  // Redirigez l'utilisateur vers l'écran de tableau de bord
  navigation.navigate('Dashboard'); // Remplacez 'Dashboard' par le nom de votre écran de tableau de bord

  return (
    <View style={styles.container}>
      <Text>Sign in fb</Text>
      <View style={{ marginTop: 100, alignItems: 'center' }}>
        <Text>Welcome! {user.displayName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
