import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import { HeaderButtons } from '../../components/HeaderButtons';
import { getFloodAlert, GeminiAnalysisResponse } from '../../api/alert';
import { styles } from "./styles"; // Reutilizando seus estilos principais

/**
 * Componente de exibição de alerta, agora com título e previsão de vizinhos.
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
            {/* --- NOVO TÍTULO DA LOCALIDADE --- */}
            <Text style={localStyles.locationTitle}>Análise para: {data.location_name}</Text>

            {/* Card Principal do Alerta */}
            <View style={[localStyles.card, { borderColor: alertColor, borderWidth: 2 }]}>
                <Text style={[localStyles.cardHeader, { backgroundColor: alertColor, color: textColor }]}>
                    {data.alert.level_name.toUpperCase()}
                </Text>
                <View style={localStyles.cardBody}>
                    <Text style={localStyles.message}>{data.alert.message}</Text>
                </View>
            </View>

            {/* Card com a Análise Técnica */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>Análise da Situação</Text>
                <View style={localStyles.cardBody}>
                    <Text style={localStyles.textBlock}>{data.analysis.summary}</Text>
                </View>
            </View>

            {/* --- NOVO CARD PARA CIDADES VIZINHAS --- */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>Previsão em Cidades Próximas</Text>
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

// A lógica principal da Home permanece a mesma, apenas o componente de exibição mudou.
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
            {renderContent()}
        </View>
    );
}

// Estilos locais para os novos componentes visuais
const localStyles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    statusText: {
        marginTop: 15,
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d9534f',
        marginBottom: 10,
    },
    errorDetails: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 10,
    },
    locationTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardBody: {
        padding: 15,
        paddingTop: 10,
    },
    message: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 25,
        color: '#333',
    },
    textBlock: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    nearbyItem: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    }
});