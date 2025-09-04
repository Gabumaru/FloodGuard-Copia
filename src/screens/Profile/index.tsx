import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import { UserObject } from '../../types/user';
import { getAuthUser, updateBairro, updateUsername } from '../../services/user';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Bairro } from '../../types/bairro';
import { listBairros } from '../../api/bairro';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export function Profile() {
    const [userData, setUserData] = useState<UserObject | undefined>();
    const [editingField, setEditingField] = useState<{ field: string, value: any } | null>(null);
    const [bairroList, setBairroList] = useState<Array<Bairro> | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    const getUserData = async () => {
        setIsLoading(true);
        const user = await getAuthUser();
        if (user) {
            setUserData(user);
        }
        setIsLoading(false);
    };

    const getBairroList = async () => {
        try {
            const data = await listBairros();
            setBairroList(data);
        } catch (error) {
            console.error("Erro ao carregar a lista de bairros:", error);
            Alert.alert("Erro", "Não foi possível carregar as opções de região. Tente novamente mais tarde.");
        }
    };

    useEffect(() => {
        getUserData();
        getBairroList();
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

    const handleBairroUpdate = async () => {
        if (editingField?.field !== 'region') return Alert.alert("Erro", "Tente novamente");
        const response = await updateBairro(editingField.value);
        if (response === true) Alert.alert("Sucesso", "Região atualizada");
        else Alert.alert("Erro", "Região não alterada");
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

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Meu Perfil</Text>

            {/* Nome de Usuário */}
            <View style={styles.info}>
                <View style={styles.infoLabelContainer}>
                    <Ionicons name="person-outline" size={24} color="#2C5E92" />
                    <Text style={styles.infoLabel}>Nome de usuário:</Text>
                </View>
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

            {/* Região */}
            <View style={styles.info}>
                <View style={styles.infoLabelContainer}>
                    <Ionicons name="location-outline" size={24} color="#2C5E92" />
                    <Text style={styles.infoLabel}>Região:</Text>
                </View>
                {editingField?.field === "region" ? (
                    <View style={styles.editSection}>
                        <Picker
                            selectedValue={editingField.value}
                            onValueChange={(itemValue) => setEditingField(prev => prev ? { ...prev, value: itemValue } : null)}
                            style={styles.pickerInput}
                        >
                            <Picker.Item label="Selecione uma região" value="" />
                            {bairroList?.map(bairro => (
                                <Picker.Item label={bairro.nomeBairro} value={bairro.id.toString()} key={bairro.id} />
                            ))}
                        </Picker>
                        <TouchableOpacity style={styles.editButton} onPress={handleBairroUpdate}>
                            <AntDesign name="check" size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.editButton, styles.cancelButton]} onPress={handleCancelUpdate}>
                            <AntDesign name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.infoDataContainer}>
                        <Text style={styles.infoData}>{
                            bairroList?.find(bairro => bairro.id === userData?.idBairro)?.nomeBairro || 'Não definido'
                        }</Text>
                        <TouchableOpacity onPress={() => setEditingField({ field: "region", value: userData?.idBairro || "" })}>
                            <Ionicons name="pencil-outline" size={20} color="#667788" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}