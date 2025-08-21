import React from 'react';
import { Image, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import recoverPasswordImage from '../../../assets/images/authentication.png';
import recoverEmail from '../../../assets/images/recoverEmail.png';

export function RecoverPassword({ navigation }: any) {
    const navToLogin = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.recoverPasswordContainer}>
            <Image
                style={styles.recoverPasswordImage}
                source={recoverPasswordImage}
                resizeMode='contain'
            />
            <View style={[styles.credentialField, styles.recoverPasswordField]}>
                <View style={styles.credentialIcon}>
                    <Image source={recoverEmail} style={styles.inputIcon}
                        resizeMode='contain'
                    />
                </View>
                <TextInput
                    style={styles.credentialInput}
                    placeholder='E-mail'
                />
            </View>
            <TouchableOpacity
                style={styles.recoverPasswordButton}
                onPress={navToLogin}
            >
                <Text style={styles.recoverPasswordButtonText}>Enviar e-mail de recuperação</Text>
            </TouchableOpacity>
        </View>
    );
}