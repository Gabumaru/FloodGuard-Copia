import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '10%',
    },
    fieldLabel: {
        fontSize: 20,
        marginBottom: 25,
    },
    fieldInput: {
        fontSize: 18,
        marginBottom: 50,
        borderWidth: .5,
        borderRadius: 10,
        padding: 25,
        minHeight: 80,
    },
    sendSection: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    sendButton: {
        backgroundColor: '#FC2F47',
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIcon: {
        width: 20,
        height: 20,
    }
});