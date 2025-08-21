import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    configItem: {
        padding: '5%',
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: 'dashed',
    },
    configLabel: {
        fontSize: 16,
    },
    switchArea: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10%',
    },
    switchOption: {
        fontSize: 16,
    },
    chosen: {
        fontWeight: 'bold',
    },
});