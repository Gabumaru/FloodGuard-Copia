import { StyleSheet } from 'react-native';

export const localStyles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    statusText: {
        marginTop: 15,
        fontSize: 16,
        color: '#667788',
        textAlign: 'center'
    },
    errorTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d9534f',
        marginBottom: 10,
    },
    errorDetails: {
        fontSize: 16,
        color: '#667788',
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 10,
    },
    locationTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C5E92',
        textAlign: 'center',
        marginVertical: 15,
    },
    // Novo estilo para o banner de alerta
    alertBanner: {
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
    },
    alertTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    alertMessage: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 22,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardHeader: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '700',
        color: '#2C5E92', // Cor do título do card
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    cardBody: {
        padding: 20,
        paddingTop: 15,
    },
    message: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 28,
        color: '#333333',
    },
    textBlock: {
        fontSize: 16,
        lineHeight: 24,
        color: '#667788',
    },
    nearbyItem: {
        fontSize: 16,
        color: '#667788',
        lineHeight: 24,
    }
});