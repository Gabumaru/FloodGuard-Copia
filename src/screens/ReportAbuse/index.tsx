import React, { useState } from 'react';
import { Text, TextInput, View, Image } from 'react-native';
import { styles } from './styles';
import sendIcon from '../../../assets/images/send.png';

export function ReportAbuse({ navigation }: any) {

    const [reportInfo, setReportInfo] = useState({
        aggressorUsername: '',
        reportReason: '',
    })

    const handleSend = () => {
        console.log(reportInfo);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.fieldLabel}>Usuário a denunciar: </Text>
            <TextInput style={[styles.fieldInput, { height: 80 }]}
                placeholder='Digite o apelido do agressor'
                onChangeText={(text) => setReportInfo(prev => {return {...prev, aggressorUsername: text}})}
            />
            <Text style={styles.fieldLabel}>Qual a causa da denúncia? </Text>
            <TextInput style={styles.fieldInput}
                multiline={true}
                placeholder='Digite o motivo da denúncia'
                onChangeText={(text) => setReportInfo(prev => {return {...prev, reportReason: text}})}
            /> 
            <View style={styles.sendSection}>
                <View style={styles.sendButton} onTouchEnd={handleSend} >
                    <Image style={styles.sendIcon} source={sendIcon} />
                </View>
            </View>
        </View>
    );
}