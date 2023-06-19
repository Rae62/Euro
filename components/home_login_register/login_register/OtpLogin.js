import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '../../../config';
import { useNavigation } from '@react-navigation/native';

const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [username, setUsername] = useState('');
  
  const navigation = useNavigation(); // Utilisation de la navigation

  const sendVerificationCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert('Code de vérification envoyé !');
    } catch (error) {
      console.log(error);
      Alert.alert("Une erreur s'est produite lors de l'envoi du code de vérification.");
    }
  };

  const signInWithPhone = async () => {
    try {
      await confirm.confirm(verificationCode);
      Alert.alert('Connexion réussie !');
      // Insérer le nom d'utilisateur dans Firestore
      await firebase.firestore().collection('users').doc(auth().currentUser.uid).set({
        username,
        phoneNumber,
      });
      // Redirection vers le dashboard
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
      Alert.alert('Échec de la connexion.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Envoyer le code" onPress={sendVerificationCode} />

      <TextInput
        placeholder="Code de vérification"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />

      <TextInput
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />

      <Button title="Se connecter" onPress={signInWithPhone} />
    </View>
  );
};

export default OtpLogin;
