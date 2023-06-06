import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Touchable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { View , Text } from "react-native-animatable";
import CustomButton from "./components/Button";
import { useNavigation } from "@react-navigation/native";



export default function Homepage() {
  const navigation = useNavigation();

  function handleClick() {
    navigation.navigate("GoogleLogin");
  }
  return (
    <LinearGradient
      colors={["#3391f3", "#5374ed"]}
      style={styles.container}
    >
      <View style={styles.view }>
      <Image
        source={require("../../../assets/logo.png")}
        style={[styles.image , styles.shadow]}
      />
      </View>
      <View style={styles.view2 }>
        <Text style={{color:'white' , fontWeight: 'bold' , fontSize:18 }}>Continue with</Text>
        <CustomButton
        title="Continue with Google"
        color="#ffa502"
        name="GoogleIcon"
        press="GoogleLogin"
      />
        <CustomButton
        title="Continue with Facebook"
        color="#ffa502"
        name="FacebookIcon"
        press="FacebookLogin"
      />
        <CustomButton
        title="Continue with Mail"
        color="#ffa502"
        name="MailIcon"
        press="SignIn"

      />
      <Text style={{color:'white' }}>or sign in with 
      <Text style={{color:'white' , fontWeight: 'bold' }} onPress={handleClick}> phone number </Text>
      </Text>
      </View>
      <View style={styles.view3}>
      <Text style={{color:'white' }}>By continuing you agree to the  
      <Text style={{color:'white' , fontWeight: 'bold' }}> terms </Text> and
      <Text style={{color:'white' , fontWeight: 'bold' }}> privacy policy </Text>
      </Text>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

  },
  view : {
    width: '100%',
    height: '50%',
    alignItems: "center",
    color:'white',
    justifyContent:'flex-end'
  },
  shadow : {
    shadowColor: "#ffff",
    shadowOffset: { width: -100, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  view2 : {
    width: '100%',
    height: '40%',
    alignItems: "center",
    color:'white',
    justifyContent:'center'
  },

  view3 : {
    width: '100%',
    height: '10%',
    alignItems: "center",
    color:'white',
    justifyContent:'center'
  },
    image: {
    width: '50%',
    height: '50%',
    borderRadius: 8,
  },

});
