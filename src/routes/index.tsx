import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import das Rotas
import WelcomeRoutes from './Welcome.routes';
import MainRoutes from './Main.routes';
import ConfigRoutes from './Config.routes';
import SecondaryRoutes from './Secondary.routes';
import AuthRoutes from './Auth.routes';
import { getValidAuthToken } from '../services/user';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {

    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAppStatus = async () => {
            // Verifica se é o primeiro lançamento
            const hasLaunched = await AsyncStorage.getItem('hasLaunched');
            if (hasLaunched === null) {
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }

            // Verifica se o usuário tem um token de autenticação válido
            const validToken = await getValidAuthToken();
            setIsLoggedIn(validToken !== null);
        };

        checkAppStatus();
    }, []);

    if (isFirstLaunch === null || isLoggedIn === null) {
        return null;
    }

    return (
        <Navigator
            initialRouteName={ 
                isFirstLaunch ? "Welcome Tabs"
                : isLoggedIn ? "Main Tabs" 
                : "Authentication Tabs" }
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen 
                name="Welcome Tabs"
                component={WelcomeRoutes}
            />

            <Screen 
                name="Main Tabs"
                component={MainRoutes}
            />

            <Screen 
                name="Secondary Tabs"
                component={SecondaryRoutes}
            />

            <Screen
                name="Configurations Tabs"
                component={ConfigRoutes}
            />

            <Screen 
                name="Authentication Tabs"
                component={AuthRoutes}
            />

        </Navigator>
    )
}