import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

export default RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");
    const [imageUri, setImageUri] = useState(null);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }

        console.log(imageUri + ":::imageUri");
    };

    const addUser = async (username, password) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("avatar", {
            uri: imageUri,
            type: "image/png", // or the type of the image you are using
            name: "avatar.png", // change the name accordingly
        });

        try {
            const response = await axios.post(
                "http://localhost:3000/user/register", // Đường dẫn API
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Định dạng dữ liệu
                    },
                }
            );

            // Xử lý phản hồi
            alert("User added successfully");
            console.log("Response:", response.data);

            // Điều hướng đến trang đăng nhập hoặc trang khác nếu cần
            navigation.navigate("Login"); // Chỉnh sửa tên trang nếu cần
        } catch (error) {
            // Xử lý lỗi
            console.error("Error adding user:", error);
            console.error("Error adding user:", error.message);
            alert(
                "Error adding user: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    const handleRegister = (username, password, retryPassword) => {
        if (username && password === retryPassword) {
            return true;
        } else {
            alert("Register failed because password not match");
            return false;
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>Username</Text>
                    <TextInput
                        placeholder="Enter your username"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Retry Password</Text>
                    <TextInput
                        placeholder="Enter again password"
                        placeholderTextColor="#ccc"
                        style={styles.input}
                        onChangeText={(text) => setRetryPassword(text)}
                    />
                </View>
                {/* Button to select an image */}
                <TouchableOpacity
                    style={styles.imagePickerButton}
                    onPress={handleImagePicker}
                >
                    <Text style={styles.imagePickerText}>Upload Image</Text>
                </TouchableOpacity>
                {imageUri && (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.previewImage}
                    />
                )}
                <TouchableOpacity
                    style={styles.btnRegister}
                    onPress={() => {
                        addUser(username, password, retryPassword);
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 24,
                            color: "#fff",
                        }}
                    >
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    inputContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
    },
    btnRegister: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "#99FF33",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    imagePickerButton: {
        height: 50,
        borderRadius: 10,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    imagePickerText: {
        color: "white",
        fontWeight: "bold",
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 20,
    },
});
