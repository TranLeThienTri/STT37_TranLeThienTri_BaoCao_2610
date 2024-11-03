import {
    SafeAreaView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/auth/login",
                {
                    username,
                    password,
                }
            );
            // Kiểm tra phản hồi
            if (response.status === 200) {
                navigation.navigate("Home", { user: response.data.user });
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Error login:", error);
            alert("Error login: username or password is incorrect");
        }
    };
    return (
        <SafeAreaView>
            {/* logo */}
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require("../assets/adaptive-icon.png")}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        resizeMode="contain"
                    />
                    <Text style={styles.titleText}>Welcome to App</Text>
                </View>
                {/* body */}
                <View style={styles.bodyContainer}>
                    <Text>Username</Text>
                    <View style={styles.inputText}>
                        <TextInput
                            placeholder="Enter your username"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <Text>Password</Text>
                    <View style={styles.inputText}>
                        <TextInput
                            placeholder="Enter your password"
                            placeholderTextColor="#ccc"
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={() => {
                            handleLogin();
                        }}
                    >
                        <Text style={styles.textLogin}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    >
                        <Text
                            style={{
                                color: "#3366CC",
                                fontStyle: "italic",
                                textAlign: "right",
                                fontSize: 20,
                                marginTop: 10,
                            }}
                        >
                            register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        marginVertical: 10,
        alignItems: "center",
    },
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
    },
    bodyContainer: {
        marginVertical: 10,
    },
    inputText: {
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        flex: 1,
        borderRadius: 10,
        marginVertical: 10,
    },
    input: {
        padding: 10,
        // outline: "none",
    },
    btnLogin: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#99FF33",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    textLogin: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#fff",
    },
});
