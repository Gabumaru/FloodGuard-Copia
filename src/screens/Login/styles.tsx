import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography } from '../../styles';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Altere a cor de fundo aqui para o tom que você usou nas outras telas
        backgroundColor: '#D8EEFF',
        justifyContent: 'center',
        padding: 20,
    },
    logoImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 50,
        resizeMode: 'contain',
    },
    credentialInputs: {
        gap: 15,
        marginBottom: 20,
    },
    credentialField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.background,
    },
    credentialInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    credentialIcon: {
        padding: 15,
    },
    inputIcon: {
        height: 20,
        width: 20,
    },
    loginButton: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    loginButtonText: {
        ...typography.body,
        color: colors.white,
        fontWeight: 'bold',
    },
    forgotPassword: {
        textAlign: 'right',
        marginTop: 15,
        ...typography.light,
        color: colors.secondary,
        textDecorationLine: 'underline',
    },
    registerArea: {
        marginTop: 30,
        alignItems: 'center',
    },
    registerText: {
        ...typography.body,
        color: colors.text,
    },
    registerLink: {
        ...typography.body,
        color: colors.accent,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    // Estilos para a tela de recuperar senha
    recoverPasswordContainer: {
        flex: 1,
        // Altere a cor de fundo aqui também
        backgroundColor: '#D8EEFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    recoverPasswordImage: {
        width: '80%',
        maxHeight: '40%',
        marginBottom: 40,
    },
    recoverPasswordField: {
        width: '100%',
        marginBottom: 25,
    },
    recoverPasswordButton: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        width: '100%',
    },
    recoverPasswordButtonText: {
        ...typography.body,
        color: colors.white,
        fontWeight: 'bold',
    },
});