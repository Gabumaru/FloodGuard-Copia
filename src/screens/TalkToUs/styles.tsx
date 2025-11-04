import { StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#2C5E92';
const SOFT_BLUE_BG = '#D8EEFF';
const SOFT_GRAY = '#667788';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SOFT_BLUE_BG, // Fundo azul
        paddingHorizontal: 25,
        paddingTop: 80,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: PRIMARY_BLUE,
        marginBottom: 50,
    },
    contactCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 30,
        width: '100%',
        alignItems: 'center',
        
        // Sombra suave (padrão do app)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    mailIcon: {
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: SOFT_GRAY,
        textAlign: 'center',
        marginBottom: 10,
    },
    contactEmail: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_BLUE, // Usa o azul principal como destaque
        marginTop: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: PRIMARY_BLUE, // Sublinhado elegante
    },
    note: {
        fontSize: 14,
        color: SOFT_GRAY,
        textAlign: 'center',
        marginTop: 40,
        paddingHorizontal: 15,
        fontStyle: 'italic',
    }
});