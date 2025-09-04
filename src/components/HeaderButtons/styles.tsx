import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        width: '100%',
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    profile: {
    },
    config: {
    },
    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cor suave semi-transparente
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonIcon: {
        width: 30,
        height: 30,
        tintColor: '#2C5E92', // Cor da paleta do seu app
    }
});