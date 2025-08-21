import { LinearGradient } from "expo-linear-gradient"
import { styles } from "./styles"
import { Text, TextInput } from "react-native"
import { useState } from "react"

export default function EmailInput({ navigation, email, setEmail }: any) {
    
    const navToLogin = () => {
        navigation.navigate('Login Screen');
    }

    return (
        <LinearGradient colors={['#66B1F2', '#4B64F2', '#5079F2', '#5E9FF2']} style={styles.container}>
            <Text style={styles.title}>{'Digite \nseu \ne-mail'}</Text>
            <TextInput style={styles.emailInput}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.hasRegister}
                onPress={navToLogin}
            >Já tenho um cadastro</Text>
        </LinearGradient>
    )
}