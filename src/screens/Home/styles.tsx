import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // REMOVIDO: backgroundColor: '#D8EEFF', <-- Foi movido para ser aplicado de forma dinâmica no index.tsx
    },
    flatList: {
        flex: 1,
        paddingHorizontal: 25,
    }
});