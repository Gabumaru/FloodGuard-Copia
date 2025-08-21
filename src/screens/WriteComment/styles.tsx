import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerDivider: {
        width: '90%',
        marginHorizontal: 'auto',
        height: 1,
        borderTopWidth: .5,
        borderColor: 'black',
    },
    commentInput: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
        marginVertical: 20,
        marginHorizontal: 25,
        paddingLeft: 25,
        fontSize: 18,
    },
    sendSection: {
        height: '10%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    sendButton: {
        backgroundColor: '#5E9FF2',
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