import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { HeaderButtons } from '../../components/HeaderButtons';
import { getFloodAlert, GeminiAnalysisResponse } from '../../api/alert';
import { styles } from "./styles";
import { localStyles } from './localStyles';

/**
 * Componente de exibição de alerta, com layout simplificado e interativo.
 */
const AlertDisplay = ({ data }: { data: GeminiAnalysisResponse }) => {
    const getAlertColor = (level: number) => {
        if (level === 3) return '#d9534f'; // Vermelho
        if (level === 2) return '#f0ad4e'; // Laranja
        if (level === 1) return '#fce883'; // Amarelo
        return '#5cb85c'; // Verde
    };
    
    const alertColor = getAlertColor(data.alert.level);
    const textColor = data.alert.level === 1 ? '#333' : 'white';
    
    return (
        <ScrollView style={localStyles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Banner de Alerta Principal */}
            <View style={[localStyles.alertBanner, { backgroundColor: alertColor }]}>
                <Text style={[localStyles.alertTitle, { color: textColor }]}>
                    {data.alert.level_name.toUpperCase()}
                </Text>
                <Text style={[localStyles.alertMessage, { color: textColor }]}>{data.alert.message}</Text>
            </View>

            {/* Card com a Análise Técnica */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>Por que este alerta?</Text>
                <View style={localStyles.cardBody}>
                    <Text style={localStyles.textBlock}>{data.analysis.summary}</Text>
                </View>
            </View>

            {/* Card com as Ações Recomendadas */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>O que devo fazer?</Text>
                <View style={localStyles.cardBody}>
                    <Text style={localStyles.textBlock}>{data.analysis.recommendations}</Text>
                </View>
            </View>

            {/* Card com a Previsão em Cidades Próximas */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>Cidades Próximas</Text>
                <View style={localStyles.cardBody}>
                    {data.nearby_forecasts.map((forecast, index) => (
                        <Text key={index} style={localStyles.nearbyItem}>
                            • {forecast}
                        </Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

// A lógica principal da Home permanece a mesma
export function Home({ navigation }: any) {
    const [alertData, setAlertData] = useState<GeminiAnalysisResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlertData = async () => {
            setIsLoading(true);
            setErrorMsg(null);

            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de localização negada. Habilite nas configurações para receber alertas.');
                setIsLoading(false);
                return;
            }
            
            try {
                const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
                const { latitude, longitude } = location.coords;
                const stationId = 'A755_BARUERI';

                const data = await getFloodAlert(stationId, latitude, longitude);
                setAlertData(data);

            } catch (error: any) {
                setErrorMsg(error.message || 'Falha ao carregar os dados do alerta.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlertData();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={localStyles.centered}>
                    <ActivityIndicator size="large" color="#5e9ff2" />
                    <Text style={localStyles.statusText}>Analisando dados para sua localização...</Text>
                </View>
            );
        }

        if (errorMsg) {
            return (
                <View style={localStyles.centered}>
                    <Text style={localStyles.errorTitle}>Ocorreu um Erro</Text>
                    <Text style={localStyles.errorDetails}>{errorMsg}</Text>
                </View>
            );
        }

        if (alertData) {
            return <AlertDisplay data={alertData} />;
        }

        return (
            <View style={localStyles.centered}>
                <Text>Nenhum dado de alerta disponível.</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <HeaderButtons navigation={navigation} />
            <Text style={localStyles.locationTitle}>Análise para: {alertData?.location_name || 'Sua Localidade'}</Text>
            {renderContent()}
        </View>
    );
}