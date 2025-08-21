import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
    divider: {
        width: '80%',
        height: 1,
        borderColor: 'black',
        borderTopWidth: 1
    },
    configItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        minHeight: '15%',
    },
    configIconContainer: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    configIcon: {
        width: 50,
        height: 50,
    },
    configText: {
        flex: 1,
        fontSize: 18,
    },
    personalInfoIcon: {
        width: 50,
        height: 50
    },
    alertConfigIcon: {
        height: 50,
        width: 50,
    },
    reportIcon: {
        height: 50,
        width: 50,
    },
    endSession: {
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        fontSize: 20,
        color: 'red'
    }
});