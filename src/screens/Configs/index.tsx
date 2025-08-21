import React from 'react';
import { Image, Text, View } from 'react-native';
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
                        name: 'Authentication Tabs', // Nome do Navigator pai
                        state: {
                            routes: [{ name: 'Login Screen' }], // Nome da tela no Navigator filho
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

    const renderConfigItem = (icon:any, text:String, toPageName:String) => 
        <View style={styles.configItem} onTouchEnd={() => navigation.navigate('Configurations Tabs', {screen: toPageName})}>
            <View style={styles.configIconContainer}>
                <Image source={icon} style={styles.configIcon} resizeMode='contain' />
            </View>
            <Text style={styles.configText}>{text}</Text>
        </View>

    return (
        <View style={styles.container}>
            { renderConfigItem( personalInfoIcon, "Informação Pessoal", 'Profile Screen' )}
            <View style={styles.divider} />
            { renderConfigItem( alertConfigIcon, "Configurar Alertas", 'Alert Configurations Screen') }
            <View style={styles.divider} />
            { renderConfigItem( reportIcon, "Denunciar Abuso", 'Report Abuse Screen')}
            <View style={styles.divider} />
            { renderConfigItem(talkToUsIcon, "Fale Conosco", 'Talk to Us Screen') }
            <Text style={styles.endSession}
                onPress={endSession}
            >Encerrar Sessão</Text>
        </View>
    );
}