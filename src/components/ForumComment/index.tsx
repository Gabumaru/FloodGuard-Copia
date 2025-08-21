import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import formatDatetimeToTimeAgo from '../../utils/formatDatetimeToTimeAgo';
import { ComentarioResponse } from '../../types/comentario';


export function ForumComment({ commentData }: { commentData: ComentarioResponse } ) {
    return (
        <View style={styles.container}>
            <View style={styles.divisionBar}></View>
            <Text style={styles.message}>{commentData.conteudo}</Text>
            <View style={styles.userInfo}>
                <Text style={styles.username}>{commentData.nomeUsuario}</Text>
                <Text style={styles.datetime}>{formatDatetimeToTimeAgo(commentData.horarioEnvio)}</Text>
            </View>
            <View style={styles.divisionBar}></View>
        </View>
    );
}