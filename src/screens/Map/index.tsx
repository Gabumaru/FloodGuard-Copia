import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

import { HeaderButtons } from '../../components/HeaderButtons';
import { styles as globalStyles } from './styles'; // Importando seus estilos existentes

export function Map({ navigation }: any) {
    // Estado para armazenar a região atual do mapa
    const [mapRegion, setMapRegion] = useState<Region | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        const getLocationAndSetMap = async () => {
            setIsLoading(true);
            setErrorMsg(null);

            // 1. Pede permissão de localização
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de localização negada. O mapa não pode ser exibido.');
                setIsLoading(false);
                return;
            }

            try {
                // 2. Obtém a localização atual do usuário
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // 3. Define a região do mapa com base na localização do usuário
                setMapRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,  // Delta controla o nível de zoom. Valores menores = mais zoom.
                    longitudeDelta: 0.01,
                });

            } catch (error) {
                console.error(error);
                setErrorMsg('Não foi possível obter a sua localização.');
            } finally {
                setIsLoading(false);
            }
        };

        getLocationAndSetMap();
    }, []); // Roda apenas uma vez quando o componente é montado

    // Renderiza uma tela de carregamento ou erro enquanto a localização é obtida
    if (isLoading || errorMsg) {
        return (
            <View style={styles.container}>
                <HeaderButtons navigation={navigation} />
                <View style={styles.centeredContent}>
                    {isLoading ? (
                        <>
                            <ActivityIndicator size="large" color="#5e9ff2" />
                            <Text style={styles.statusText}>Obtendo sua localização...</Text>
                        </>
                    ) : (
                        <Text style={styles.statusText}>{errorMsg}</Text>
                    )}
                </View>
            </View>
        );
    }
    
    return (
        <View style={globalStyles.container}>
            <HeaderButtons navigation={navigation} />
            <MapView
                style={styles.map}
                initialRegion={mapRegion!} // Usa a região obtida para inicializar o mapa. O '!' diz ao TypeScript que temos certeza que não é nulo aqui.
                showsUserLocation={true}    // Opcional: mostra o ponto azul padrão do sistema para a localização do usuário
                showsMyLocationButton={true} // Opcional: mostra um botão para recentralizar no usuário
            >
                {/* Adicionamos um marcador (pin) customizado na localização do usuário */}
                {mapRegion && (
                    <Marker
                        coordinate={{
                            latitude: mapRegion.latitude,
                            longitude: mapRegion.longitude,
                        }}
                        title="Sua Localização"
                        description="Você está aqui!"
                    />
                )}
            </MapView>
        </View>
    );
}

// Estilos locais para o componente
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        top: 80, // Ajuste para não ficar embaixo do HeaderButtons
    },
    container: {
        flex: 1,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusText: {
        marginTop: 10,
        fontSize: 16,
    }
});
