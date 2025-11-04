import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// CORREÇÃO APLICADA: Importar os hooks useState, useEffect e useCallback
import React, { useState, useEffect, useCallback } from 'react'; 
import { View, Text, ActivityIndicator } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Screens
import { Home } from '../screens/Home'
import { Forum } from '../screens/Forum';
import { Map } from '../screens/Map';
import { InitialSetup } from '../screens/InitialSetup'; // Importa a nova tela

const { Navigator, Screen } = createBottomTabNavigator()

// Chaves de armazenamento
const USER_CEP_KEY = '@FloodGuard_UserCEP';


// Componente que decide qual tela renderizar (Home ou InitialSetup)
function HomeWrapper({ navigation }: any) {
    const [isSetupComplete, setIsSetupComplete] = useState<boolean | null>(null);

    useEffect(() => {
        const checkSetup = async () => {
            const userCep = await AsyncStorage.getItem(USER_CEP_KEY);
            // Verifica se o CEP foi salvo e tem 8 dígitos (o que indica que o setup foi concluído)
            setIsSetupComplete(!!userCep && userCep.length === 8); 
        };
        checkSetup();
    }, []);

    // Enquanto verifica, você pode retornar um indicador de carregamento
    if (isSetupComplete === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D8EEFF' }}>
                <ActivityIndicator size="large" color="#2C5E92" />
                <Text style={{color: '#2C5E92', marginTop: 10}}>Preparando...</Text>
            </View>
        );
    }

    if (!isSetupComplete) {
        // Se o setup NÃO estiver completo, renderiza a InitialSetup
        return <InitialSetup navigation={navigation} />;
    }

    // Se o setup estiver completo, renderiza a Home
    return <Home navigation={navigation} />;
}


export default function MainRoutes() {
    return (
        <Navigator
            initialRouteName='Home Screen'
            screenOptions={{
                tabBarStyle: { 
                    backgroundColor: '#2d3142',
                    height: 55, 
                    // Remova o paddingHorizontal se o botão central não estiver centralizando bem
                },
                tabBarActiveTintColor: '#5e9ff2',
                tabBarInactiveTintColor: '#ffffff',
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Screen 
                name='Home Screen'
                component={HomeWrapper} // Usa o Wrapper para verificação
                options={{
                    tabBarIcon: ({color}) => (
                        <Ionicons 
                            name='notifications'
                            size={35}
                            color={color}
                        />
                    ),
                    title: 'Alertas', // Mude o título para ser mais relevante
                }}
            />
            {/* ROTAS DE FORUM E MAPA FORAM REMOVIDAS DAQUI */}
        </Navigator>
    )
}