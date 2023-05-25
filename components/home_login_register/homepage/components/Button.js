import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import GoogleIcon from "../../../../assets/google.png";
import FacebookIcon from "../../../../assets/facebook.png";
import MailIcon from "../../../../assets/email.png";
import { useNavigation } from "@react-navigation/native";

const CustomButton = ({ title, name, press }) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate(press);
  };
  switch (name) {
    case "GoogleIcon":
      return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Image source={GoogleIcon} style={styles.googleIcon} />
          <Text style={styles.buttonText}>{title}</Text>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      );
      break;
    case "FacebookIcon":
      return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Image source={FacebookIcon} style={styles.googleIcon} />
          <Text style={styles.buttonText}>{title}</Text>
          <Text style={styles.buttonText}></Text>

        </TouchableOpacity>
      );
    case "MailIcon":
      return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Image source={MailIcon} style={styles.googleIcon} />
          <Text style={styles.buttonText}>{title}</Text>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      );
    default:
      break;
  }
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: '80%',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
});

export default CustomButton;
