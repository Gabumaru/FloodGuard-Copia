import React, { useRef, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import logo from '../../../assets/images/logo.png';

import { styles } from './styles';

export default function Welcome({ navigation }: any) {

    const [currentScreen, setCurrentScreen] = useState(0);
    const pagerRef = useRef<PagerView>(null);

    const screens = [
        { 
            title: "Conheça o App que Prevê Enchentes",
            description: 'Saiba como nosso aplicativo usa tecnologia para monitorar chuvas e prever enchentes, mantendo você informado e seguro.',
        },
        {
            title: "Por Dentro do App de Alertas de Enchente",
            description: 'Descubra os segredos por trás das previsões precisas e dos alertas em tempo real que nosso aplicativo oferece para ajudar você a se preparar melhor.',
        },
        {
            title: "Comece a Usar o App Hoje Mesmo",
            description: 'Veja como é fácil começar a usar nosso aplicativo, configurar alertas e receber informações para proteger você e sua sua comunidade.',
        },
    ];

    const navToRegisterUser = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Authentication Tabs', // Nome do Navigator pai
                        state: {
                            routes: [{ name: 'Register User Screen' }], // Nome da tela no Navigator filho
                        },
                    },
                ],
            })
        );
    };    

    const nextScreen = async () => {
        if(currentScreen < screens.length - 1) {
            pagerRef.current?.setPage(currentScreen + 1)
        } 
        else {
            await AsyncStorage.setItem('hasLaunched', 'true');
            navToRegisterUser();
        }
    };

    const onPageSelected = (e: { nativeEvent: { position: number } }) => {
        setCurrentScreen(e.nativeEvent.position);
    }

    return (
        <View style={styles.container}>

            <Image source={logo} style={styles.logo} />

            {/* Componente PagerView para deslizar */}
            <PagerView 
                style={styles.pagerView}
                ref={pagerRef}
                onPageSelected={onPageSelected}
            >
                { screens.map((screen, index) => (
                    <View key={index} style={styles.page}>
                        <Text style={styles.title}>{screen.title}</Text>
                        <Text style={styles.description}>{screen.description}</Text>
                    </View>
                )) }
            </PagerView>

            <View style={styles.pageChangers}>
                {/* Botão para avançar ou concluir */}
                { currentScreen === screens.length - 1 && (
                    <TouchableOpacity style={styles.nextButton} onPress={nextScreen}>
                        <Text style={styles.nextButtonText}>
                            Ir para o App
                        </Text>
                    </TouchableOpacity>
                ) }

                {/* Indicadores (bolinhas) */}
                <FlatList
                    data={screens}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    contentContainerStyle={[
                        styles.indicatorContainer,
                        { opacity: currentScreen >= 0 ? 1 : 0 }, // Força re-render
                    ]}
                    renderItem={({ index }) => (
                        <View style={styles.indicatorItem}>
                            <TouchableOpacity
                                style={[
                                    styles.indicator,
                                    index === currentScreen && styles.currentIndicator,
                                    index <= currentScreen && styles.coloredIndicator,
                                ]}
                                onPress={() => pagerRef.current?.setPage(index)}
                            />
                            {index < screens.length - 1 && index < currentScreen && (
                                <View style={styles.indicatorsLink} />
                            )}
                        </View>
                    )}
                />
            </View>
        </View>
    );
}