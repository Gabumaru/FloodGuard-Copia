import React, { useState } from "react";
import { Alert, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { registerUser } from "../../services/user";
import logo from '../../../assets/images/logo.png'; // Importe a logo

interface RegisterUserProps {
    navigation: any;
}

export function RegisterUser({ navigation }: RegisterUserProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegisterUser = async () => {
        if (!email || !password) {
            return Alert.alert("Campos obrigatórios", "Por favor, preencha o e-mail e a senha para se cadastrar.");
        }
        const registeredUser = await registerUser(email, password);
        if (registeredUser) {
            Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
            navigation.navigate('Login Screen');
        } else {
            Alert.alert("Erro no cadastro", "Não foi possível realizar o cadastro. Tente novamente.");
        }
    }

    const navToLogin = () => {
        navigation.navigate('Login Screen');
    }

    return (
        <View style={styles.container}>
            {/* Logo adicionada aqui */}
            <Image 
                source={logo} 
                style={styles.logoImage}  
            />
            <Text style={styles.title}>Crie sua conta</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterUser}>
                <Text style={styles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>
            <View style={styles.loginArea}>
                <Text style={styles.loginText}>
                    Já possui uma conta?{" "}
                    <Text style={styles.loginLink} onPress={navToLogin}>
                        Faça login!
                    </Text>
                </Text>
            </View>
        </View>
    );
}