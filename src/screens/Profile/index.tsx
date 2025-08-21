import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styles } from './styles';
import { UserObject } from '../../types/user';
import { getAuthUser, updateBairro } from '../../services/user';
import writeIcon from '../../../assets/images/write.png';
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateUsername } from '../../services/user';
import { Bairro } from '../../types/bairro';
import { listBairros } from '../../api/bairro';
import { Picker } from '@react-native-picker/picker';

export function Profile() {

    const [userData, setUserData] = useState<UserObject | undefined>();
    const [editingField, setEditingField] = useState<{field: string, value: any} | null>(null);
    
    const [bairroList, setBairroList] = useState<Array<Bairro> | undefined>();

    const getUserData = async () => {
        const user = await getAuthUser();
        if(user) setUserData(user);
    }

    const getBairroList = async () => {
        const data = await listBairros();
        setBairroList(data);
    }

    useEffect(() => { 
        getUserData(); 
        getBairroList();
    }, []);

    const onEditChange = (text: string) => setEditingField((prev: {field: string, value: any} | null) => prev ? ({...prev, value: text}) : null);
    const handleUsernameUpdate = async () => {
        if(editingField?.field != 'username') return Alert.alert("Erro", "Tente novamente");
        const response = await updateUsername(editingField.value);
        if(response === true) Alert.alert("Sucesso", "Nome de usuário atualizado");
        else Alert.alert("Erro", "Nome de usuário não alterado");
        await getUserData();
        setEditingField(null);
    }
    const handleBairroUpdate = async () => {
        if(editingField?.field != 'region') return Alert.alert("Erro", "Tente novamente");
        const response = await updateBairro(editingField.value);
        if(response === true) Alert.alert("Sucesso", "Região atualizada");
        else Alert.alert("Erro", "Região não alterada");
        await getUserData();
        setEditingField(null);
    }
    const handleCancelUpdate = () => {
        Alert.alert("Cancelado", "Alteração cancelada");
        setEditingField(null);
    }

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.infoLabel}>Nome de usuário: </Text>
                { editingField?.field == "username" ? 
                    <>
                     <TextInput style={styles.editInput}
                        placeholder='E-mail' autoCapitalize='none'
                        value={editingField.value} onChangeText={onEditChange}
                    />
                    <View style={styles.editButtons}>

                        <AntDesign name="check" size={18} color="white" style={{...styles.editButton, ...styles.checkButton}}
                        onPress={handleUsernameUpdate} />
                        <AntDesign name="close" size={18} color="white" style={{...styles.editButton, ...styles.cancelButton}} 
                        onPress={handleCancelUpdate} />
                    </View>
                    </>
                : (<>
                    <Text style={styles.infoData}>{userData?.nomeUsuario}</Text>
                    <TouchableOpacity style={styles.editTouch} 
                        onPress={() => setEditingField({field: "username", value: userData?.nomeUsuario || ""})}
                    >
                        <Image source={writeIcon} style={styles.editIcon} /> 
                    </TouchableOpacity>
                </>) }
            </View>
            <View style={styles.info}>
                <Text style={styles.infoLabel}>E-mail: </Text>
                <Text style={styles.infoData} numberOfLines={1}>{userData?.email}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoLabel}>Região: </Text>
                { editingField?.field == "region" ? 
                    <>
                    <Picker
                        selectedValue={editingField.value}
                        onValueChange={(itemValue) => setEditingField(prev => prev ? {...prev, value: itemValue} : null)}
                        style={styles.editInput} // use o mesmo estilo do TextInput se quiser
                    >
                        <Picker.Item label="Selecione uma região" value="" />
                        {bairroList?.map(bairro => (
                            <Picker.Item label={bairro.nomeBairro} value={bairro.id.toString()} key={bairro.id} />
                        ))}
                    </Picker>
                    <View style={styles.editButtons}>
                        <AntDesign name="check" size={18} color="white"
                            style={{...styles.editButton, ...styles.checkButton}}
                            onPress={handleBairroUpdate}
                        />
                        <AntDesign name="close" size={18} color="white"
                            style={{...styles.editButton, ...styles.cancelButton}}
                            onPress={handleCancelUpdate}
                        />
                    </View>
                    </>
                : (<>
                    <Text style={styles.infoData}>{
                        bairroList?.find(bairro => bairro.id == userData?.idBairro)?.nomeBairro
                    }</Text>
                    <TouchableOpacity style={styles.editTouch} 
                        onPress={() => setEditingField({field: "region", value: userData?.idBairro || ""})}
                    >
                        <Image source={writeIcon} style={styles.editIcon} /> 
                    </TouchableOpacity>
                </>) }
            </View>
            {/* <View style={styles.info}>
                <Text style={styles.infoLabel}>Data de cadastro: </Text>
                <Text style={styles.infoData}>{userData?.dataRegistro}</Text>
            </View> */}
        </View>
    );
}