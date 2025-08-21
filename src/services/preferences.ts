import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Preferences {
    enableNotifications: boolean;
    notificateOnlyOwnRegion: boolean;
    // Mais preferencias serão configuradas aqui!
}
  
export const setUserPreferences = async ( preferences:Preferences ) => {
    await AsyncStorage.setItem('preferences', JSON.stringify(preferences));
}

export const getUserPreferences = async ():Promise<Preferences | undefined> => {
    const preferences = await AsyncStorage.getItem('preferences');
    return preferences ? JSON.parse(preferences) : undefined;
}