import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8EEFF', // Fundo azul
        paddingHorizontal: 25,
        paddingTop: 80,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D8EEFF',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#2C5E92',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2C5E92',
        textAlign: 'center',
        marginBottom: 40,
    },
    
    // --- ESTILOS DO NOVO CAMPO DE TESTE ---
    alertTestContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    alertTestHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C5E92',
        marginBottom: 5,
    },
    alertTestStatus: {
        fontSize: 16,
        color: '#667788',
        marginBottom: 10,
    },
    testInputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    testInputField: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginRight: 10,
        textAlign: 'center',
    },
    testSaveButton: {
        backgroundColor: '#2C5E92',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    testSaveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // --- FIM DOS ESTILOS DE TESTE ---

    info: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 30,
        width: '100%',
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2C5E92',
        marginLeft: 10,
    },
    infoDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    infoData: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#333333',
        flex: 1,
    },
    editSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    editInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#333333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        marginRight: 10,
    },
    editButton: {
        backgroundColor: '#2C5E92',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    cancelButton: {
        backgroundColor: '#D9534F',
    },
});