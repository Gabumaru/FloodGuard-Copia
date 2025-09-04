import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF', // Fundo branco mais limpo
        width: '100%',
        borderRadius: 12, // Borda arredondada para consistência
        marginBottom: 15, // Espaço entre os cards
        padding: 20,
        gap: 15,
        // Adicionando uma sombra
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    divisionBar: {
        height: 1,
        backgroundColor: '#E0E0E0', // Cor mais suave
        marginVertical: 5,
    },
    message: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 22,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Alinha os itens nas extremidades
        alignItems: 'center',
        marginTop: 5,
    },
    username: {
        fontWeight: '600',
        fontSize: 15,
        color: '#2C5E92', // Cor de destaque para o nome de usuário
    },
    datetime: {
        color: '#999999', // Cor mais suave para a data
        fontSize: 13,
    },
});