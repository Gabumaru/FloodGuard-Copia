import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles'; // O 'colors' e 'typography' devem ser do seu arquivo de estilos global.

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8EEFF', // Cor de fundo da tela de boas-vindas
        justifyContent: 'center',
        paddingHorizontal: 25,
    },
    logoImage: { 
        width: 150,
        height: 150,
        alignSelf: 'center', 
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2C5E92',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        fontSize: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    registerButton: {
        backgroundColor: '#2C5E92',
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginArea: {
        marginTop: 30,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#667788',
    },
    loginLink: {
        color: '#2C5E92',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});