import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, View, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import logo from '../../../assets/images/logo.png';
import emailIcon from '../../../assets/images/email.png';
import paasswordIcon from '../../../assets/images/password.png';
import { styles } from './styles';
import { loginUser } from '../../services/user';

export function Credentials({ navigation }: any ) {
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const verifyLogin = async () => {
        const response = await loginUser(credentials.email, credentials.password);
        console.log('login response: ', response);
        if(!response) {
            Alert.alert("Erro ao realizar login", "Email ou senha incorretos");
            return;
        }

        navToHome();
    };

    const navToHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Main Tabs',
                        state: {
                            routes: [{ name: 'Home Screen' }],
                        },
                    },
                ],
            })
        );
    }

    const navToRecoverPassword = () => {
        navigation.navigate('Recover Password Screen');
    }

    const navToRegisterUser = () => {
        navigation.navigate('Register User Screen');
    }

    // useEffect(() => console.log('credentials: ', credentials), [credentials]);
    
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logoImage} />
            <View style={styles.credentialInputs}>
                <View style={styles.credentialField}>
                    <View style={styles.credentialIcon}>
                        <Image source={emailIcon} style={styles.inputIcon} />
                    </View>
                    <TextInput style={styles.credentialInput}
                        placeholder='E-mail' autoCapitalize='none'
                        onChangeText={(text) => setCredentials(prev => { return { ...prev, email: text }})}
                    />
                </View> 
                <View style={styles.credentialField}>
                    <View style={styles.credentialIcon}>
                        <Image source={paasswordIcon} style={styles.inputIcon} />
                    </View>
                    <TextInput style={styles.credentialInput}
                        placeholder='Senha' secureTextEntry={true}
                        onChangeText={(text) => setCredentials(prev => { return { ...prev, password: text }})}
                    />
                </View>
            </View>
            <View style={styles.loginButton} 
                onTouchEnd={ verifyLogin }
            >
                <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>Entrar</Text>
            </View>
            <Text style={styles.forgotPassword}
                onPress={navToRecoverPassword}
            >Esqueci minha senha</Text>
            <View style={styles.registerArea}>
                <Text style={styles.registerText}>Não possui uma conta? 
                    <Text style={styles.registerLink} onPress={navToRegisterUser}> Cadastre-se!</Text>
                </Text>
            </View>
        </View>
    );
}