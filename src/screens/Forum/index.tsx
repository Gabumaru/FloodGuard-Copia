import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { styles } from './styles';
import { HeaderButtons } from '../../components/HeaderButtons';
import { ForumComment } from '../../components/ForumComment';
import { WriteCommentButton } from '../../components/WriteCommentButton';

import { ComentarioResponse } from '../../types/comentario';
import { listComentarios } from '../../api/comentario';

export function Forum({ navigation }: any) {

    const [forumMessages, setForumMessages] = useState<Array<ComentarioResponse> | undefined>();    

    const getComentarios = async () => {
        const data = await listComentarios();
        setForumMessages(data.reverse())
    }

    useEffect(() => {
        getComentarios();

        const interval = setInterval(() => {
            getComentarios();
        }, 15000); // 15000ms = 15 segundos

        return () => clearInterval(interval); // limpa quando o componente desmonta
    }, []);

    return (
        <View style={styles.container}>
            <HeaderButtons navigation={navigation} />
            <FlatList 
                style={styles.flatList}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}
                data={forumMessages}
                renderItem={({ item }) => <ForumComment commentData={item} />}
                keyExtractor={item => `comment-${item.id}`} 
            />
            <WriteCommentButton navigation={navigation} />
        </View>
    );
}