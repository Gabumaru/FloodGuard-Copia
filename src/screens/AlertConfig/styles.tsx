// src/screens/AlertConfig/styles.tsx

import { StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#2C5E92';
const SOFT_BLUE_BG = '#D8EEFF';
const RED_ALERT = '#D9534F'; 
const SOFT_GRAY = '#667788';

// Exportar o objeto de cores do Switch SEPARADAMENTE
export const switchThemeColors = {
    track: { false: '#767577', true: PRIMARY_BLUE },
    thumb: { false: '#F4F3F4', true: PRIMARY_BLUE },
    colorDanger: RED_ALERT,
    colorPrimary: PRIMARY_BLUE,
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: SOFT_BLUE_BG,
    },
    configItem: {
        // Estilo de Cartão
        flexDirection: 'column', // MUDANÇA 1: Coloca o Label acima da Área do Switch
        alignItems: 'flex-start', // Alinha o conteúdo à esquerda
        
        backgroundColor: '#FFFFFF', 
        borderRadius: 12, 
        padding: 20,
        marginBottom: 15,
        
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    configLabel: {
        // MUDANÇA 2: Ocupa toda a largura, garantindo que o texto não seja cortado
        width: '100%', 
        fontSize: 16,
        fontWeight: '500',
        color: PRIMARY_BLUE,
        marginBottom: 15, // Espaço entre o label e o SwitchArea
    },
    switchArea: {
        // MUDANÇA 3: Volta a ser row para alinhar switch e texto
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribui os elementos nas extremidades
        marginTop: 5,
    },
    switchOption: {
        fontSize: 15,
        color: SOFT_GRAY, 
        minWidth: 70,
        textAlign: 'center',
    },
    chosen: {
        fontWeight: 'bold',
    },
    colorDanger: {
        color: RED_ALERT,
    },
    colorPrimary: {
        color: PRIMARY_BLUE, 
    },
    // Removida a classe switchColors
});