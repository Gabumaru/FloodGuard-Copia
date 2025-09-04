import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import { styles } from './styles';

const logo = require('../../../assets/images/logo.png');
const introImage1 = require('../../../assets/images/intro1.png');
const introImage2 = require('../../../assets/images/intro2.png');
const introImage3 = require('../../../assets/images/intro3.png');

export default function Welcome({ navigation }: any) {

    const [currentScreen, setCurrentScreen] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const screens = [
        {
            title: "Previsão de Enchentes em Tempo Real",
            description: 'Use a tecnologia para monitorar chuvas e prever enchentes, mantendo você e sua comunidade seguros e informados.',
            image: introImage1,
        },
        {
            title: "Alertas Precisos, Mais Segurança",
            description: 'Receba alertas em tempo real e previsões precisas para se preparar e proteger o que é mais importante.',
            image: introImage2,
        },
        {
            title: "Proteja sua Comunidade",
            description: 'Cadastre-se e comece a usar o app para receber informações essenciais e contribuir para a segurança de todos.',
            image: introImage3,
        },
    ];

    // Função que navega para a tela de Login
    const navToLogin = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Authentication Tabs',
                        state: {
                            routes: [{ name: 'Login Screen' }],
                        },
                    },
                ],
            })
        );
    };

    const nextScreen = async () => {
        if (currentScreen < screens.length - 1) {
            pagerRef.current?.setPage(currentScreen + 1)
        }
        else {
            await AsyncStorage.setItem('hasLaunched', 'true');
            navToLogin();
        }
    };

    const onPageSelected = (e: { nativeEvent: { position: number } }) => {
        setCurrentScreen(e.nativeEvent.position);
    }

    return (
        <View style={styles.container}>

            {/* Logo no topo */}
            <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} />
                {/* A linha abaixo foi removida */}
                {/* <Text style={styles.appName}>FLOODGUARD</Text> */}
            </View>

            {/* PagerView para o conteúdo */}
            <PagerView
                style={styles.pagerView}
                ref={pagerRef}
                onPageSelected={onPageSelected}
            >
                {screens.map((screen, index) => (
                    <View key={index} style={styles.page}>
                        {screen.image && <Image source={screen.image} style={styles.image} />}
                        <Text style={styles.title}>{screen.title}</Text>
                        <Text style={styles.description}>{screen.description}</Text>
                    </View>
                ))}
            </PagerView>

            <View style={styles.pageChangers}>
                {/* Indicadores de página */}
                <View style={styles.indicatorContainer}>
                    {screens.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                index === currentScreen && styles.currentIndicator,
                            ]}
                        />
                    ))}
                </View>

                {/* Botão para a última tela */}
                {currentScreen === screens.length - 1 && (
                    <TouchableOpacity style={styles.nextButton} onPress={nextScreen}>
                        <Text style={styles.nextButtonText}>
                            Começar
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}