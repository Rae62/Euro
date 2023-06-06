import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , onAuthStateChanged , auth } from "firebase/auth";
import firebase from 'firebase/compat/app'


export default function EmailLogin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const auth = getAuth();
  const handleValidation = () => {
    let formIsValid = true;
    const errorsCopy = { ...errors };

    // Vérification du champ Email
    if (!email) {
      errorsCopy.email = "Le champ Email est requis.";
      formIsValid = false;
    } else {
      errorsCopy.email = "";
    }

    // Vérification du champ Mot de passe
    if (!password) {
      errorsCopy.password = "Le champ Mot de passe est requis.";
      formIsValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
    ) {
      errorsCopy.password =
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre";
      formIsValid = false;
    } else {
      errorsCopy.password = "";
    }

    // Vérification du champ Confirmation de mot de passe
    if (!confirmPassword) {
      errorsCopy.confirmPassword =
        "Le champ Confirmation de mot de passe est requis.";
      formIsValid = false;
    } else if (password !== confirmPassword) {
      errorsCopy.confirmPassword = "Les mots de passe ne correspondent pas.";
      formIsValid = false;
    } else {
      errorsCopy.confirmPassword = "";
    }

    if(formIsValid === true) {
      handleSignUp();
    }

    setErrors(errorsCopy);
    return formIsValid;

  };

  const handleSubmit = () => {
    if (handleValidation()) {
      //   navigation.navigate("Confirmation-numero");
    }
  };

  

  const handleLogin = () => {
    navigation.navigate("Game-Homepage");
  };

  const handleSignUp = () => {
      createUserWithEmailAndPassword(auth ,email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const [transition, setTransition] = useState(true);

  const handleTransition = () => {
    setTransition(!transition);
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <LinearGradient
      colors={["#5982e8", "#5EFCE8", "#192f6a"]}
      style={styles.container}
    >
      <SafeAreaView
        style={{ flex: 1, marginTop: StatusBar.currentHeight }}
        keyboardVerticalOffset={1}
      >
        <View style={styles.container}>
          {transition ? (
            <>
              <View style={styles.boutonsCI}>
                <Text style={styles.actif}>Connexion</Text>
                <Text style={[styles.btn]} onPress={handleTransition}>
                  Inscription
                </Text>
              </View>
              <View style={styles.divInput}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#5982e8"
                />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mot de passe"
                  placeholderTextColor="#5982e8"
                  secureTextEntry={true}
                />
                <TouchableOpacity
                  style={styles.btnConnexion}
                  title="Connexion"
                  onPress={() => handleLogin()}
                >
                  <Text style={{ color: "white" }}>Connexion</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.boutonsCI}>
                <Text style={styles.btn} onPress={handleTransition}>
                  Connexion
                </Text>
                <Text style={styles.actif}>Inscription</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              ></View>
              <View style={styles.divInput}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#5982e8"
                />
                {errors.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}

                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mot de passe"
                  placeholderTextColor="#5982e8"
                  secureTextEntry={true}
                />
                {errors.password ? (
                  <Text style={styles.error}>{errors.password}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirmer le mot de passe"
                  placeholderTextColor="#5982e8"
                  secureTextEntry={true}
                />
                {errors.confirmPassword ? (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                ) : null}
                <TouchableOpacity
                  style={styles.btnConnexion}
                  title="Inscription"
                  onPress={() => handleValidation()}
                >
                  <Text style={{ color: "white" }}>Inscription</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boutonsCI: {
    flex: 0.04,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  btn: {
    width: "40%",
    textAlign: "center",
    color: "white",
  },
  actif: {
    borderBottomWidth: 2,
    color: "blue",
    borderColor: "white",
  },
  divInput: {
    flex: 0.45,
    display: "flex",
    flexDirection: "column",
    width: "90%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    flex: 0.2,
    width: "100%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#5982e8",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: 10,
    color: "#5982e8",
  },
  btnConnexion: {
    flex: 0.2,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    borderWidth: 2,
    backgroundColor: "#5982e8",
    borderRadius: 10,
    borderColor: "#5982e8",
  },
  error: {
    fontSize: 12,
    color: "#cc0000",
    textAlign: "center",
  },
});
