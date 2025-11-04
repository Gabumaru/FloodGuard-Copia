// src/services/notifications.ts

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const FCM_TOKEN_KEY = '@FloodGuard_FCMToken';

/**
 * Pede permissão e obtém o Token FCM do dispositivo.
 * O token deve ser salvo no backend do usuário para que ele possa receber notificações.
 */
export async function getAndSaveFCMToken(): Promise<string | null> {
    try {
        // 1. Solicita permissões
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            // 2. Obtém o token
            const token = await messaging().getToken();
            
            if (token) {
                // 3. Salva o token localmente (opcional, mas bom para cache)
                await AsyncStorage.setItem(FCM_TOKEN_KEY, token);
                
                // >>> AÇÃO NECESSÁRIA: Chame sua API para salvar este token no perfil do usuário <<<
                // Ex: await saveUserFCMTokenToBackend(token);
                console.log("FCM Token obtido e pronto para uso:", token);
                
                return token;
            }
        } else {
            // Permissão negada
            Alert.alert(
                "Permissão Necessária", 
                "Habilite as notificações para receber alertas de emergência."
            );
        }
    } catch (error) {
        console.error("Erro ao obter o Token FCM:", error);
    }
    return null;
}