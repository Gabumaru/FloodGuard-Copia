import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8EEFF', // Fundo azul padrão
        justifyContent: 'center',
        padding: 25,
    },
    content: {
        width: '100%',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2C5E92',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#667788',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C5E92',
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 18,
        fontSize: 16,
        color: '#333333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cepGroup: {
        marginBottom: 50,
    },
    cepInput: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2C5E92',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#2C5E92',
        shadowColor: '#2C5E92',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    button: {
        backgroundColor: '#2C5E92',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});