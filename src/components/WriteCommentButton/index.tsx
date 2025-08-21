import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';
import writeIcon from '../../../assets/images/write.png';

export function WriteCommentButton({ navigation }: any) {

    const navToWriteComment = () => {
        navigation.navigate('Secondary Tabs', { screen: 'Write Comment Screen' })
    }

    return (
        <View style={styles.container}
            onTouchEnd={navToWriteComment}
        >
            <Image source={writeIcon} style={styles.icon} /> 
        </View>
    );
}