import React from 'react';
import { Image, View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from './styles';
import recoverPasswordImage from '../../../assets/images/authentication.png';
import recoverEmail from '../../../assets/images/recoverEmail.png';
import rainBackground from '../../../assets/images/rain.png'; // Importe a imagem rain.png

export function RecoverPassword({ navigation }: any) {
    const navToLogin = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.fullScreenContainer}> {/* Usamos um novo estilo para o container principal */}
            {/* Imagem de fundo rain.png */}
            <Image
                source={rainBackground}
                style={StyleSheet.absoluteFillObject}
                resizeMode="cover"
            />

            {/* Overlay semi-transparente para o conteúdo */}
            <View style={styles.overlay}>
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
        </View>
    );
}