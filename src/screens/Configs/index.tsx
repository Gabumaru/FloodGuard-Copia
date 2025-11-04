import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native'; // Adicionado TouchableOpacity
import { CommonActions } from '@react-navigation/native';
import { styles } from './styles';
import personalInfoIcon from '../../../assets/images/personalInfo.png';
import alertConfigIcon from '../../../assets/images/bell.png';
import reportIcon from '../../../assets/images/report.png';
import talkToUsIcon from '../../../assets/images/talkToUs.png';
import { logoutUser } from '../../services/user';

export function Configs({ navigation }: any) {

    const navToLogin = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Authentication Tabs',
                        state: {
                            routes: [{ name: 'Login Screen' }],
                        },
                    },
                ],
            })
        );
    };    

    const endSession = async () => {
        await logoutUser();
        navToLogin();
    } 

    const renderConfigItem = (icon:any, text:string, toPageName:string) => 
        <TouchableOpacity 
            style={styles.configItem} 
            onPress={() => navigation.navigate('Configurations Tabs', {screen: toPageName})} // Usando onPress
        >
            <View style={styles.configIconContainer}>
                <Image source={icon} style={styles.configIcon} resizeMode='contain' />
            </View>
            <Text style={styles.configText}>{text}</Text>
            {/* Adiciona uma seta para indicar navegação, mantendo o estilo de cartão */}
            <Text style={styles.arrowIcon}>›</Text> 
        </TouchableOpacity>

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Configurações</Text>
            
            <View style={styles.optionsList}>
                { renderConfigItem( personalInfoIcon, "Informação Pessoal", 'Profile Screen' )}
                { renderConfigItem( alertConfigIcon, "Configurar Alertas", 'Alert Configurations Screen') }
                { renderConfigItem( reportIcon, "Denunciar Abuso", 'Report Abuse Screen')}
                { renderConfigItem(talkToUsIcon, "Fale Conosco", 'Talk to Us Screen') }
            </View>
            
            <TouchableOpacity style={styles.endSessionButton} onPress={endSession}>
                <Text style={styles.endSessionText}>Encerrar Sessão</Text>
            </TouchableOpacity>
        </View>
    );
}