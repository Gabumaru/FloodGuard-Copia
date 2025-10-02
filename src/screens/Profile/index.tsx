import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { styles } from './styles';
import { UserObject } from '../../types/user';
import { getAuthUser, updateUsername } from '../../services/user';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { getAlertConfig, mapValueToAlertLevel } from '../../utils/FloodAlertLevels';

const TEST_ALERT_LEVEL_KEY = '@FloodGuard_TestAlertLevel';

export function Profile({ navigation }: any) { // Adicionado 'navigation' para futuras melhorias
    const [userData, setUserData] = useState<UserObject | undefined>();
    const [editingField, setEditingField] = useState<{ field: string, value: any } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Novo estado para a porcentagem de teste (agora um string para o TextInput)
    const [testAlertValue, setTestAlertValue] = useState('0'); 

    const loadTestAlertValue = async () => {
        const savedValue = await AsyncStorage.getItem(TEST_ALERT_LEVEL_KEY);
        if (savedValue !== null) {
            setTestAlertValue(savedValue);
        }
    };
    
    const saveTestAlertValue = async () => {
        const value = parseInt(testAlertValue);
        if (isNaN(value) || value < 0 || value > 100) {
            return Alert.alert("Erro de Valor", "A porcentagem deve ser um número entre 0 e 100.");
        }
        await AsyncStorage.setItem(TEST_ALERT_LEVEL_KEY, value.toString());
        
        // Opcional: Forçar a Home a buscar os dados novamente (depende da sua navegação)
        // Se a Home estiver montada, ela buscará o novo valor no próximo evento.
        Alert.alert("Sucesso", `Nível de teste salvo: ${value}%`);
    };

    const getUserData = async () => {
        setIsLoading(true);
        const user = await getAuthUser();
        if (user) {
            setUserData(user);
        }
        setIsLoading(false);
    };

    useEffect(() => { 
        getUserData(); 
        loadTestAlertValue(); 
    }, []);

    const onEditChange = (text: string) => setEditingField((prev: { field: string, value: any } | null) => prev ? ({ ...prev, value: text }) : null);

    const handleUsernameUpdate = async () => {
        if (editingField?.field !== 'username') return Alert.alert("Erro", "Tente novamente");
        const response = await updateUsername(editingField.value);
        if (response === true) Alert.alert("Sucesso", "Nome de usuário atualizado");
        else Alert.alert("Erro", "Nome de usuário não alterado");
        await getUserData();
        setEditingField(null);
    };

    const handleCancelUpdate = () => {
        Alert.alert("Cancelado", "Alteração cancelada");
        setEditingField(null);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2C5E92" />
                <Text style={styles.loadingText}>Carregando dados do perfil...</Text>
            </View>
        );
    }

    const currentAlertLevel = mapValueToAlertLevel(parseInt(testAlertValue) || 0);
    const currentAlertLevelName = getAlertConfig(currentAlertLevel).name;

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text style={styles.headerTitle}>Meu Perfil</Text>

            {/* --- Novo Campo de Teste de Alerta com Input --- */}
            <View style={styles.alertTestContainer}>
                <Text style={styles.alertTestHeader}>
                    Teste de Alerta
                </Text>
                <Text style={styles.alertTestStatus}>
                    Nível Atual: {currentAlertLevelName} ({testAlertValue}%)
                </Text>
                
                <View style={styles.testInputGroup}>
                    <TextInput
                        style={styles.testInputField}
                        keyboardType='numeric'
                        placeholder="0-100"
                        value={testAlertValue}
                        onChangeText={setTestAlertValue}
                        maxLength={3}
                    />
                    <TouchableOpacity style={styles.testSaveButton} onPress={saveTestAlertValue}>
                        <Text style={styles.testSaveButtonText}>Salvar Teste</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* ----------------------------------------------- */}

            {/* Nome de Usuário */}
            <View style={styles.info}>
                <View style={styles.infoLabelContainer}>
                    <Ionicons name="person-outline" size={24} color="#2C5E92" />
                    <Text style={styles.infoLabel}>Nome de usuário:</Text>
                </View>
                {/* ... (O restante do código de exibição/edição do Nome de Usuário) */}
                {editingField?.field === "username" ? (
                    <View style={styles.editSection}>
                        <TextInput
                            style={styles.editInput}
                            placeholder='Nome de usuário'
                            autoCapitalize='none'
                            value={editingField.value}
                            onChangeText={onEditChange}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={handleUsernameUpdate}>
                            <AntDesign name="check" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.editButton, styles.cancelButton]} onPress={handleCancelUpdate}>
                            <AntDesign name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.infoDataContainer}>
                        <Text style={styles.infoData}>{userData?.nomeUsuario || 'Não definido'}</Text>
                        <TouchableOpacity onPress={() => setEditingField({ field: "username", value: userData?.nomeUsuario || "" })}>
                            <Ionicons name="pencil-outline" size={20} color="#667788" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* E-mail */}
            <View style={styles.info}>
                <View style={styles.infoLabelContainer}>
                    <Ionicons name="mail-outline" size={24} color="#2C5E92" />
                    <Text style={styles.infoLabel}>E-mail:</Text>
                </View>
                <View style={styles.infoDataContainer}>
                    <Text style={styles.infoData} numberOfLines={1}>{userData?.email || 'Não definido'}</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}