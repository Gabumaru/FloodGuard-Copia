import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(216, 238, 255, 0.7)',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    logo: {
        width: 200, 
        height: 200, 
        resizeMode: 'contain',
    },
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
    image: {
        width: width * 0.7,
        height: width * 0.7,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        // Nova cor para o título para maior contraste
        color: '#FFFFFF',
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 24,
        // Nova cor para a descrição para maior contraste
        color: '#F0F0F0',
        paddingHorizontal: 20,
    },
    pageChangers: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#BCC6D0',
        marginHorizontal: 4,
    },
    currentIndicator: {
        width: 16,
        backgroundColor: '#2C5E92',
    },
    nextButton: {
        backgroundColor: '#2C5E92',
        width: width * 0.8,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    nextButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});