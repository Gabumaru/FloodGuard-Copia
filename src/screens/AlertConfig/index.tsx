import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { styles } from './styles';

import { Preferences, getUserPreferences, setUserPreferences } from '../../services/preferences';

export function AlertConfig({ navigation }:any) {

    const [ preferences, setPreferences ] = useState<Preferences>({
        enableNotifications: true,
        notificateOnlyOwnRegion: false,
    });

    useEffect(() => {
        const getData = async () => {
            const data = await getUserPreferences();
            if(data) setPreferences(data);
        }
        getData();
    }, [])

    useEffect(() => { 
        if(preferences.enableNotifications === false)
        for( const attribute in preferences ) {
            if(attribute !== 'enableNotifications')
                toggleSwitch(attribute, false);
        }
    }, [preferences.enableNotifications])

    const toggleSwitch = (attributeName: string, value: boolean) => {
        setPreferences(prev => {return { ...prev, [attributeName]: value }})
    }

    useEffect(() => {
        // Listener para salvar as preferências ao sair da tela
        const unsubscribe = navigation.addListener('blur', async () => {
            await setUserPreferences(preferences);
        });

        return unsubscribe; // Remove o listener ao desmontar
    }, [navigation, preferences]);

    return (
        <View style={styles.container}>
            <View style={styles.configItem}>
                <Text style={styles.configLabel}>Habilitar notificações</Text>
                <View style={styles.switchArea}>
                    <Text style={[styles.switchOption, !preferences.enableNotifications ? {...styles.chosen, color: '#FC2F47'} : {} ]}>Desabilitado</Text>
                        <Switch 
                            trackColor={{false: '#767577', true: '#5b92f2'}}
                            thumbColor={preferences.enableNotifications ? '#4b64f2' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => toggleSwitch('enableNotifications', value)}
                            value={preferences.enableNotifications}
                        />
                    <Text style={[styles.switchOption, preferences.enableNotifications ? {...styles.chosen, color: '#5b92f2'} : {} ]}>Habilitado</Text>
                </View>
            </View>
            <View style={[styles.configItem, !preferences.enableNotifications ? { opacity: .5 } : {}]}>
                <Text style={styles.configLabel}>Receber apenas notificações de alertas na minha região</Text>
                <View style={styles.switchArea}>
                    <Text style={[styles.switchOption, !preferences.notificateOnlyOwnRegion ? {...styles.chosen, color: '#FC2F47'} : {} ]}>Desabilitado</Text>
                        <Switch 
                            trackColor={{false: '#767577', true: '#5b92f2'}}
                            thumbColor={preferences.notificateOnlyOwnRegion ? '#4b64f2' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => toggleSwitch('notificateOnlyOwnRegion', value)}
                            value={preferences.notificateOnlyOwnRegion}
                            disabled={!preferences.enableNotifications}
                        />
                    <Text style={[styles.switchOption, preferences.notificateOnlyOwnRegion ? {...styles.chosen, color: '#5b92f2'} : {} ]}>Habilitado</Text>
                </View>
            </View>
        </View>
    );
}