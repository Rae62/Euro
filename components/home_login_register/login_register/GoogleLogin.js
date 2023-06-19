import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../../config';

export default function GoogleLogin() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  const configureGoogleSignin = async () => {
    await GoogleSignin.configure({
      webClientId: '722842100650-uld17finnipicf5f5bgg0smh8pjlohu4.apps.googleusercontent.com',
    });
  };

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const navigation = useNavigation(); // Get navigation object

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      const currentUser = firebase.auth().currentUser;
      if (user) {
        navigation.navigate('Dashboard', { displayName: user.displayName });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ height: 300, width: 65, marginTop: 300 }}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Welcome, {user.displayName}</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
