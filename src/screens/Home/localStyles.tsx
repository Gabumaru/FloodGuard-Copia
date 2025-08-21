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
        color: '#666',
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
        color: '#333',
        textAlign: 'center',
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 10,
    },
    locationTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardBody: {
        padding: 15,
        paddingTop: 10,
    },
    message: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 25,
        color: '#333',
    },
    textBlock: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    nearbyItem: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    }
});