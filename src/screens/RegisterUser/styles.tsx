import { StyleSheet } from 'react-native';
import { colors, typography } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightGray,
        justifyContent: 'center',
        padding: 20,
    },
    logoImage: { 
        width: '75%',
        alignSelf: 'center', 
        marginBottom: 20,
    },
    title: {
        ...typography.h1,
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.background,
        padding: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    registerButton: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
    },
    registerButtonText: {
        ...typography.body,
        color: colors.white,
        fontWeight: 'bold',
    },
    loginArea: {
        marginTop: 30,
        alignItems: 'center',
    },
    loginText: {
        ...typography.body,
        color: colors.text,
    },
    loginLink: {
        ...typography.body,
        color: colors.accent,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});