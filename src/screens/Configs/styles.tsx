import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8EEFF', // Fundo azul padrão
        alignItems: 'center',
        paddingTop: 40, // Mais espaço do topo
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2C5E92',
        marginBottom: 30,
        alignSelf: 'flex-start',
    },
    optionsList: {
        width: '100%',
        gap: 10, // Espaçamento entre os cartões (substitui o divider)
    },
    // Removida a classe 'divider'
    
    configItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: 70, // Altura padrão para o cartão
        backgroundColor: '#FFFFFF', // Fundo branco
        borderRadius: 12, // Borda arredondada
        paddingRight: 20,
        paddingVertical: 10,
        
        // Sombra suave (padrão do app)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    configIconContainer: {
        width: 60, // Menor
        alignItems: 'center',
        justifyContent: 'center',
    },
    configIcon: {
        width: 30, // Ícone menor para caber melhor
        height: 30,
        tintColor: '#2C5E92', // Garante que ícones preto/branco sejam azuis
    },
    configText: {
        flex: 1,
        fontSize: 17,
        color: '#333333',
        fontWeight: '500',
    },
    arrowIcon: {
        fontSize: 24,
        color: '#999',
    },
    // --- ESTILOS DE ENCERRAMENTO ---
    endSessionButton: {
        position: 'absolute',
        bottom: 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: '#D9534F', // Vermelho forte para o botão de segurança
        alignSelf: 'center',
    },
    endSessionText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    // Removidas classes de ícones não utilizados (personalInfoIcon, alertConfigIcon, etc.)
});