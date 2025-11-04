import { StyleSheet } from 'react-native';

const PRIMARY_BLUE = '#2C5E92';
const SOFT_BLUE_BG = '#D8EEFF';
const RED_ALERT = '#D9534F'; 

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: SOFT_BLUE_BG, // Fundo azul
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: PRIMARY_BLUE,
        marginBottom: 30,
        alignSelf: 'center',
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: PRIMARY_BLUE,
        marginBottom: 10,
        marginTop: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20, // Espaçamento entre os campos
    },
    fieldInput: {
        // Estilo do Cartão de Input
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#333333',
        borderWidth: 0, // Removendo a borda original
        minHeight: 50,
        
        // Sombra suave (como nos outros cartões)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    multilineInput: {
        minHeight: 150, // Altura maior para o campo de denúncia
        paddingTop: 15, // Padding para o texto começar no topo
    },
    // --- BOTÃO FLUTUANTE DE ENVIO ---
    sendButton: {
        position: 'absolute',
        right: 25,
        bottom: 50, // Elevado do fundo
        width: 60,
        height: 60,
        borderRadius: 30, // Círculo
        backgroundColor: RED_ALERT, // Cor de alerta/ação (vermelho para denúncia)
        justifyContent: 'center',
        alignItems: 'center',
        
        // Sombra mais forte para parecer flutuante
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    // Classes antigas não utilizadas ou substituídas foram removidas
    sendIcon: {}, 
    sendSection: {},
});