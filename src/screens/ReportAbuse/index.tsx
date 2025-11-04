import React, { useState } from 'react';
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native'; // Adicionado TouchableOpacity
import { styles } from './styles';
import sendIcon from '../../../assets/images/send.png';
import { Ionicons } from '@expo/vector-icons'; // Para usar ícones modernos

export function ReportAbuse({ navigation }: any) {

    const [reportInfo, setReportInfo] = useState({
        aggressorUsername: '',
        reportReason: '',
    })

    const handleSend = () => {
        console.log(reportInfo);
        // Aqui você adicionaria a lógica para enviar a denúncia à API
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Denunciar Abuso</Text>

            {/* Campo 1: Usuário a Denunciar */}
            <Text style={styles.fieldLabel}>Usuário a denunciar:</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.fieldInput} // Removida a altura fixa inline
                    placeholder='Digite o apelido do agressor'
                    placeholderTextColor="#999999"
                    onChangeText={(text) => setReportInfo(prev => ({...prev, aggressorUsername: text}))}
                />
            </View>

            {/* Campo 2: Motivo da Denúncia */}
            <Text style={styles.fieldLabel}>Qual a causa da denúncia?</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.fieldInput, styles.multilineInput]} // Estilo para multi-linhas
                    multiline={true}
                    placeholder='Digite o motivo da denúncia'
                    placeholderTextColor="#999999"
                    textAlignVertical="top" // Alinha o texto no topo para multiline
                    onChangeText={(text) => setReportInfo(prev => ({...prev, reportReason: text}))}
                /> 
            </View>
            
            {/* Botão de Envio (Flutuante) */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>

        </View>
    );
}