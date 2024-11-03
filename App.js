import { Text, SafeAreaView, StyleSheet } from "react-native";

// or any files within the Snack
import Screen from "./components/screen.js";
import LoginScreen from "./components/login.js";
import ProfileScreen from "./components/profile.js";
import RegisterScreen from "./components/register.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
// const Stack = createNativeStackNavigator();
export default function App() {
    // return <Screen />;
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Screen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
