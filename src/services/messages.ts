import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Message {
    id: number,
    sender: string,
    datetime: string,
    message: string
}

export const getUserMessages = async ():Promise<Array<Message>> => {
    const messages = await AsyncStorage.getItem('user_messages');
    return messages ? JSON.parse(messages) : [];
}
  
export const setUserMessages = async ( message:Message ) => {
    const userMessages = await getUserMessages();
    userMessages.push(message)
    await AsyncStorage.setItem('user_messages', JSON.stringify(userMessages));
    return
}