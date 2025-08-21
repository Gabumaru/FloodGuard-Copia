import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        gap: 25,
        paddingTop: '20%',
        paddingHorizontal: '10%',
    },
    info: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        // backgroundColor: 'red'
        
    },
    infoLabel: {
        maxWidth: '40%',
        fontWeight: '500',
        fontSize: 20,
    },
    infoData: {
        textAlign: 'right',
        fontWeight: 'normal',
        fontSize: 18,
        color: '#333',
        alignSelf: 'flex-end',
        paddingRight: 30
    },
    editTouch: {
        position: 'absolute',
        right: 0,
        bottom: 4
    },
    editIcon: {
        width: 16,
        height: 16,
    },
    editInput: {
        alignSelf: 'flex-end',
        flex: 1,
        marginLeft: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        height: '100%'
    },
    editButtons: {
        overflow: 'hidden',
        height: '100%'
    },
    editButton: {
        flex: 1,
        aspectRatio: 1,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    checkButton: {
        backgroundColor: 'green',
        borderTopRightRadius: 10
    },
    cancelButton: {
        backgroundColor: 'darkred',
        borderBottomRightRadius: 10
    }
});