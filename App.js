import React , {useState , useCallback, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./components/home_login_register/homepage/Homepage";
import GoogleLogin from "./components/home_login_register/login_register/GoogleLogin";
import FacebookLogin from "./components/home_login_register/login_register/FacebookLogin";
import SignIn from "./components/home_login_register/login_register/SignIn";
import SignUp from "./components/home_login_register/login_register/SignUp";
import OtpLogin from "./components/home_login_register/login_register/OtpLogin";
import {firebase} from './config'
import Dashboard from "./components/Dashboard";



const Stack = createStackNavigator();
function App() {
  const [initializing , setinitializing] = useState(true);
  const [user , setUser] = useState();

  // Handle user state changes

  function onAuthStateChanged(user) {
    setUser(user);

    if(initializing) setinitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[])

  if(initializing) return null;

  if(!user) {
    return(
      <Stack.Navigator>
        <Stack.Screen name="Main-Homepage" component={Homepage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="FacebookLogin" component={FacebookLogin} />
        <Stack.Screen name="OtpLogin" component={OtpLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
  }
  return (
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
  );
}


export default () => {
  return(
    <NavigationContainer>
    <App/>
    </NavigationContainer>
  )
}