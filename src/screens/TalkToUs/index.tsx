import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importa ícones

import { styles } from './styles';

export function TalkToUs() {
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Fale Conosco</Text>
            
            <View style={styles.contactCard}>
                <Ionicons name="mail-outline" size={36} color="#2C5E92" style={styles.mailIcon} />
                <Text style={styles.description}>
                    Envie-nos uma mensagem! Responderemos o mais breve possível.
                </Text>
                <Text style={styles.contactEmail}>floodguard.app@fakemail.com</Text>
            </View>

            <Text style={styles.note}>
                Para dúvidas sobre alertas ou denúncias de abuso, utilize as seções específicas no menu de Configurações.
            </Text>
        </View>
    );
}