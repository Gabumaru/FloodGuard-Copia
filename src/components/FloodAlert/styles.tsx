import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 25,
    },
    riskMessage: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    listContainer: {
        marginBottom: 16,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#444",
        marginRight: 8,
    },
    regionText: {
        fontSize: 16,
        color: "#333",
    },
    warningTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "red",
        marginBottom: 4,
    },
    warningDetails: {
        fontSize: 15,
        color: "red",
        marginBottom: 8,
    },
    linkText: {
        fontSize: 16,
        color: "red",
        textDecorationLine: "underline",
        paddingLeft: 10,
    },
});