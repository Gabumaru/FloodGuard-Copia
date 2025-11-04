import React, { useState, useEffect, useCallback } from 'react'; // Adicionado useCallback
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Para recarregar ao voltar para a tela

import { HeaderButtons } from '../../components/HeaderButtons';
import { getFloodAlert, GeminiAnalysisResponse } from '../../api/alert';
import { styles } from "./styles";
import { localStyles } from './localStyles';
import { getAlertConfig, mapValueToAlertLevel } from '../../utils/FloodAlertLevels';

const TEST_ALERT_LEVEL_KEY = '@FloodGuard_TestAlertLevel';
const DEFAULT_BG_COLOR = '#D8EEFF'; // Cor padrão de fundo para ser aplicada com transparência


const hexToRgba = (hex: string, alpha: number = 0.2): string => {
    let r = 0, g = 0, b = 0;
    
    // 3 dígitos hex
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } 
    // 6 dígitos hex
    else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    
    // Retorna a cor RGBA. Usamos 0.2 para um fundo bem suave.
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


/**
 * Componente de exibição de alerta.
 */
const AlertDisplay = ({ data }: { data: GeminiAnalysisResponse }) => {
    
    const config = getAlertConfig(data.alert.level);
    
    const alertColor = config.color;
    const textColor = config.textColor; 
    
    return (
        <ScrollView style={localStyles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Banner de Alerta Principal */}
            <View style={[localStyles.alertBanner, { backgroundColor: alertColor }]}>
                <Text style={[localStyles.alertTitle, { color: textColor }]}>
                    {config.name.toUpperCase()}
                </Text>
                <Text style={[localStyles.alertMessage, { color: textColor }]}>
                    {data.alert.message}
                </Text>
            </View>

            {/* Card com as Ações Recomendadas (O que devo fazer?) */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>O que devo fazer?</Text>
                <View style={localStyles.cardBody}>
                    <Text style={localStyles.textBlock}>{config.actionMessage}</Text>
                </View>
            </View>

            {/* Card com a Análise Técnica */}
            <View style={localStyles.card}>
                <Text style={localStyles.cardHeader}>Por que este alerta?</Text>
                <View style={localStyles.cardBody}>
                    <Text style={localStyles.textBlock}>{data.analysis.summary}</Text>
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


export function Home({ navigation }: any) {
    const [alertData, setAlertData] = useState<GeminiAnalysisResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR); // Novo estado para a cor de fundo

    const fetchAlertData = async () => {
        setIsLoading(true);
        setErrorMsg(null);

        let data: GeminiAnalysisResponse | null = null;
        let locationDenied = false;

        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
            locationDenied = true;
            setErrorMsg('Permissão de localização negada. Habilite nas configurações para receber alertas.');
        }
        
        try {
            if (!locationDenied) {
                const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
                const { latitude, longitude } = location.coords;
                const stationId = 'A755_BARUERI';

                data = await getFloodAlert(stationId, latitude, longitude);
            } else {
                 data = {
                    location_name: 'Localização Desativada',
                    alert: { level: 1, level_name: 'Sem Risco', message: 'Dados de localização não puderam ser obtidos.' },
                    analysis: { summary: 'Sem dados de localização para análise.', recommendations: 'Recomendamos habilitar a localização.' },
                    nearby_forecasts: []
                };
            }

            // >>> LÓGICA PARA LER E APLICAR O NÍVEL DE TESTE (EXECUTADA SEMPRE) <<<
            const testValueString = await AsyncStorage.getItem(TEST_ALERT_LEVEL_KEY);
            if (testValueString !== null && data) {
                const testLevel = mapValueToAlertLevel(parseInt(testValueString));
                const config = getAlertConfig(testLevel); 
                
                data.alert.level = testLevel;
                data.alert.level_name = config.name;
                data.alert.message = config.actionMessage;
                data.analysis.recommendations = config.actionMessage;
                data.analysis.summary = `Modo de Teste Ativo (${testValueString}%). Exibindo: ${config.name}.`;

                setBgColor(hexToRgba(config.color, 0.2)); // <--- APLICA A COR CLARA AQUI!
                
                setErrorMsg(null); 
            } else if (data) {
                // Aplica a cor de fundo baseada no alerta real da API
                const config = getAlertConfig(data.alert.level);
                setBgColor(hexToRgba(config.color, 0.2)); 
            }
            // >>> FIM DA LÓGICA DE TESTE <<<

            setAlertData(data);
            
        } catch (error: any) {
            if (!locationDenied) { 
                setErrorMsg(error.message || 'Falha ao carregar os dados do alerta.');
            }
            // Em caso de erro de API, mantém o fundo padrão
            setBgColor(DEFAULT_BG_COLOR); 
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAlertData();
        }, [])
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={localStyles.centered}>
                    <ActivityIndicator size="large" color="#5e9ff2" />
                    <Text style={localStyles.statusText}>Analisando dados para sua localização...</Text>
                </View>
            );
        }
        
        if (errorMsg && !alertData) { 
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
        <View style={[styles.container, { backgroundColor: bgColor }]}> {/* <--- APLICA A COR DINÂMICA AQUI! */}
            <HeaderButtons navigation={navigation} />
            <Text style={localStyles.locationTitle}>Análise para: {alertData?.location_name || 'Sua Localidade'}</Text>
            {renderContent()}
        </View>
    );
}