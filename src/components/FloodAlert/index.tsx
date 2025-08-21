import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { FloodAlertObject } from '../../types/api';

export function FloodAlert({ alert }: { alert: FloodAlertObject }) {
    return (
        <View style={styles.container}>
            {/* Título */}
            <Text style={styles.riskMessage}>{alert.riskMessage}</Text>

            {/* Lista de Regiões */}
            <View style={styles.listContainer}>
            {alert.regions.map((region, index) => (
                <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.regionText}>{region};</Text>
                </View>
            ))}
            </View>

            {/* Mensagem de Atenção */}
            { alert?.warning && (<>
                <Text style={styles.warningTitle}>{alert.warning.message}</Text>
                <Text>
                    <Text style={styles.warningDetails}>{alert.warning.details} Veja mais sobre </Text>
                    <Text style={styles.linkText}
                        onPress={() => console.log(alert.warning?.link)}
                    >aqui</Text>
                </Text>
                
            </>)}
        </View>
    );
}