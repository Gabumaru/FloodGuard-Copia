import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

// Chaves de armazenamento
const USER_NAME_KEY = '@FloodGuard_UserName';
const USER_CEP_KEY = '@FloodGuard_UserCEP';

export function InitialSetup({ navigation }: any) {
    const [name, setName] = useState('');
    const [cep, setCep] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Função para formatar o CEP (apenas números)
    const formatCep = (text: string) => {
        return text.replace(/[^0-9]/g, '');
    };

    const handleSaveAndProceed = async () => {
        const cleanedCep = formatCep(cep);
        
        if (!name.trim()) {
            return Alert.alert('Atenção', 'Por favor, insira seu nome.');
        }

        if (cleanedCep.length !== 8) {
            return Alert.alert('Atenção', 'Por favor, insira um CEP válido com 8 dígitos.');
        }

        setIsSaving(true);
        try {
            await AsyncStorage.setItem(USER_NAME_KEY, name.trim());
            await AsyncStorage.setItem(USER_CEP_KEY, cleanedCep);

            // NAVEGAÇÃO CORRIGIDA: Vai para a Main Tabs (onde a Home está)
            // Se Main Tabs for o nome do Navigator principal, esta linha está correta.
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Main Tabs' }], 
                })
            );
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar os dados. Tente novamente.');
            setIsSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <Text style={styles.headerTitle}>Bem-vindo(a)!</Text>
                <Text style={styles.subtitle}>
                    Precisamos de alguns dados para personalizar seu alerta.
                </Text>

                {/* Nome do Usuário */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Seu Nome Completo</Text>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Ex: Maria da Silva"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* CEP - DESTAQUE */}
                <View style={[styles.inputGroup, styles.cepGroup]}>
                    <Text style={styles.inputLabel}>
                        <Ionicons name="map-outline" size={20} color="#2C5E92" /> CEP (Sua Localização Principal)
                    </Text>
                    <TextInput
                        style={styles.cepInput}
                        placeholder="Apenas números (00000-000)"
                        keyboardType="numeric"
                        value={cep}
                        onChangeText={(text) => setCep(formatCep(text))}
                        maxLength={8}
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleSaveAndProceed}
                    disabled={isSaving}
                >
                    <Text style={styles.buttonText}>
                        {isSaving ? 'Salvando...' : 'Começar a Monitorar'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}