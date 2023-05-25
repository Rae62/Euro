import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "./components/home_login_register/homepage/Homepage";
import GoogleLogin from "./components/home_login_register/login_register/GoogleLogin";
import FacebookLogin from "./components/home_login_register/login_register/FacebookLogin";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main-Homepage" component={Homepage} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
        <Stack.Screen name="FacebookLogin" component={FacebookLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
