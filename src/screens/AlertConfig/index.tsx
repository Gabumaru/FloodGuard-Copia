// src/screens/AlertConfig/index.tsx

import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
// Adicionamos 'switchThemeColors' à importação dos estilos
import { styles, switchThemeColors } from './styles'; 

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
                toggleSwitch(attribute as keyof Preferences, false);
        }
    }, [preferences.enableNotifications])

    const toggleSwitch = (attributeName: keyof Preferences, value: boolean) => {
        setPreferences(prev => {return { ...prev, [attributeName]: value }})
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', async () => {
            await setUserPreferences(preferences);
        });

        return unsubscribe;
    }, [navigation, preferences]);

    return (
        <View style={styles.container}>
            <View style={styles.configItem}>
                <Text style={styles.configLabel}>Habilitar Notificações</Text>
                <View style={styles.switchArea}>
                    <Text style={[styles.switchOption, !preferences.enableNotifications ? {...styles.chosen, ...styles.colorDanger} : {} ]}>Desabilitado</Text>
                        <Switch 
                            // CORREÇÃO: Aplicamos o objeto de cores diretamente
                            trackColor={switchThemeColors.track}
                            thumbColor={preferences.enableNotifications ? switchThemeColors.thumb.true : switchThemeColors.thumb.false}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => toggleSwitch('enableNotifications', value)}
                            value={preferences.enableNotifications}
                        />
                    <Text style={[styles.switchOption, preferences.enableNotifications ? {...styles.chosen, ...styles.colorPrimary} : {} ]}>Habilitado</Text>
                </View>
            </View>
            <View style={[styles.configItem, !preferences.enableNotifications ? { opacity: .5 } : {}]}>
                <Text style={styles.configLabel}>Receber apenas alertas da minha região</Text>
                <View style={styles.switchArea}>
                    <Text style={[styles.switchOption, !preferences.notificateOnlyOwnRegion ? {...styles.chosen, ...styles.colorDanger} : {} ]}>Desabilitado</Text>
                        <Switch 
                            // CORREÇÃO: Aplicamos o objeto de cores diretamente
                            trackColor={switchThemeColors.track}
                            thumbColor={preferences.notificateOnlyOwnRegion ? switchThemeColors.thumb.true : switchThemeColors.thumb.false}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) => toggleSwitch('notificateOnlyOwnRegion', value)}
                            value={preferences.notificateOnlyOwnRegion}
                            disabled={!preferences.enableNotifications}
                        />
                    <Text style={[styles.switchOption, preferences.notificateOnlyOwnRegion ? {...styles.chosen, ...styles.colorPrimary} : {} ]}>Habilitado</Text>
                </View>
            </View>
        </View>
    );
}