import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#66b1f2',
    },
    logo: {
        marginHorizontal: '10%',
        marginTop: '10%',
        width: '80%'
    },
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginBottom: 60,
        paddingHorizontal: 50,
        width: '100%',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    description: {
        paddingHorizontal: 50,
        fontSize: 16,
        fontWeight: '300',
        textAlign: 'center',
        lineHeight: 25,
    },
    pageChangers: {
        height: 120,
    },
    indicatorContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: 50,
    },
    indicatorItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#5b92f2',
        marginHorizontal: 5,
    },
    currentIndicator: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    coloredIndicator: {
        backgroundColor: '#4b64f2',
    },
    indicatorsLink: {
        position: 'absolute',
        backgroundColor: '#4b64f2',
        left: 15,
        width: 15,
        height: 4
    },
    nextButton: {
        backgroundColor: '#5b92f288',
        position: 'relative',
        top: -20,
        padding: 15,
        marginHorizontal: 60,
        borderRadius: 10,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#4b64f2',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});