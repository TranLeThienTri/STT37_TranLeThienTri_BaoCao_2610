import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import axios from "axios";
export default ProfileScreen = ({ navigation, route }) => {
    const user = route.params?.user;
    const [username, setUsername] = useState(user.name);
    const [password, setPassword] = useState(user.password);
    const [image, setImage] = useState(user.avatar);
    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/user/${user.id}`,
                { name: username, password, image }
            );
            // Kiểm tra phản hồi
            if (response.status === 200) {
                navigation.navigate("Login");
            } else {
                alert("update failed");
            }
        } catch (error) {
            alert("Error update user");
            console.log("Error update user:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/user/${user.id}`
            );
            // Kiểm tra phản hồi
            if (response.status === 200) {
                navigation.navigate("Login");
            } else {
                alert("Delete failed");
            }
        } catch (error) {
            alert("Error delete user");
            console.log("Error delete user:", error);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    {/* <Image
                        source={require("../assets/adaptive-icon.png")}
                        style={styles.avatar}
                        resizeMode="contain"
                    /> */}

                    <Image
                        source={user && user.avatar ? { uri: `http://localhost:8081/uploads/${user.avatar}` } : require('../assets/adaptive-icon.png')}
                        style={styles.avatar}
                    />
                </View>
                {/* body */}
                <View style={styles.bodyContainer}>
                    <Text>Username</Text>
                    <View style={styles.inputText}>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <Text>Password</Text>
                    <View style={styles.inputText}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.btnUpdate}
                        onPress={() => {
                            handleUpdate();
                        }}
                    >
                        <Text style={styles.textLogin}>Update Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnDelete}
                        onPress={() => {
                            handleDelete();
                        }}
                    >
                        <Text style={styles.textLogin}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        alignItems: "center",
        alignItems: "center",
    },
    avatar: {
        width: 300,
        height: 300,
        borderRadius: "50%",
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
    },
    btnUpdate: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#99FF33",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    btnDelete: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "red",
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
