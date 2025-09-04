import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#2C5E92', // Usando a cor de destaque da sua paleta
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // Removido o opacity, já que o fundo é sólido
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: '#FFFFFF', // Ícone branco para contraste com o azul
    }
});