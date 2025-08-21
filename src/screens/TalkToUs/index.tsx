import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function TalkToUs() {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>E-mail para contato: </Text>
            <Text style={styles.contactEmail}>floodguard.app@fakemail.com</Text>
        </View>
    );
}