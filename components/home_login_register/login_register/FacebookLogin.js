import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { getAuth, FacebookAuthProvider, signInWithCredential} from 'firebase/auth';
import { firebase } from '../../../config';
import { LoginManager, AccessToken} from 'react-native-fbsdk-next';
import React, {useState , useEffect} from 'react';
import 'expo-dev-client';
export default function FacebookLogin() {
  const [initializing , setInitializing] = useState(true);
  const [user , setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signInWithFB = async () => {
    try {
      await LoginManager.logInWithPermissions(['public_profile', 'email']);
      const data = await AccessToken.getCurrentAccessToken();
      if(!data) {
        return;
      }
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
      const auth = getAuth();
      const response = await signInWithCredential(firebase.auth(), facebookCredential);
      console.log(response);
    } catch(e) {
      console.log(e);
    }
  }
 const signOut = async () => {
  try{
    await firebase.auth().signOut();
  } catch(e) {
    console.log(e);
  }
 }

  if(initializing) return null ; 
  
  if(!user){
    return (
      <View style={styles.container}>
        <Text>Sign in with Facebook </Text>
        <Button title='Sign in with Facebook' onPress={signInWithFB}></Button>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <Text>Sign in fb</Text>
      <View style={{marginTop:100, alignItems:'center'}}>
        <Text>Welcome ! {user.displayName}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
