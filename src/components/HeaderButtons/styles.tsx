import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        width: '100%',
        height: '8%',
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
    },
    profile: {
    },
    config: {
    },
    button: {
        position: 'relative',
        height: '100%',
        aspectRatio: 1/1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        position: 'relative',
        height: 35,
        aspectRatio: 1/1,
    }
});