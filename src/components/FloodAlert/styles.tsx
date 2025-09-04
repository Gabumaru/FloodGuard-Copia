import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    riskMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
    },
    listContainer: {
        marginBottom: 16,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2C5E92', // Usando a cor de destaque
        marginRight: 8,
    },
    regionText: {
        fontSize: 16,
        color: '#333333',
    },
    warningTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#D9534F', // Cor vermelha para alertas
        marginBottom: 4,
    },
    warningDetails: {
        fontSize: 15,
        color: '#D9534F',
        marginBottom: 8,
    },
    linkText: {
        fontSize: 16,
        color: '#2C5E92',
        textDecorationLine: 'underline',
        paddingLeft: 10,
    },
});