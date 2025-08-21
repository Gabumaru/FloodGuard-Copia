import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native-gesture-handler';
import sendIcon from '../../../assets/images/send.png';
import { createComentario } from '../../api/comentario';

export function WriteComment({ navigation }: any) {

    const [comment, setComment] = useState<string>('');

    const handleSend = async () => {
        const response = await createComentario(comment);
        if(response) console.log(response);
        navigation.goBack(); // Fecha a tela atual
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerDivider} />
            <TextInput placeholder='Digite aqui sua mensagem...'
                style={styles.commentInput} multiline={true}
                onChangeText={setComment}
            />
            <View style={styles.headerDivider} />
            <View style={styles.sendSection}>
                <View style={styles.sendButton} onTouchEnd={handleSend} >
                    <Image style={styles.sendIcon} source={sendIcon} />
                </View>
            </View>
        </View>
    );
}