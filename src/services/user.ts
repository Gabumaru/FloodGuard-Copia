import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

import { handleBairroUpdate, handleLogin, handleRegister, handleUsernameUpdate } from "../api/user";
import { UserObject } from "../types/user";

export async function registerUser(email: string, password: string) {
    const response = await handleRegister(email, password);

    if (response) return response;
    return undefined;
}

export async function loginUser(email: string, password: string) {
    try {
        const response = await handleLogin(email, password); // Chama a função da API

        if (response && response.token && response.usuario) {
            await SecureStore.setItemAsync('userToken', response.token); // Salvar o token
            await SecureStore.setItemAsync('userData', JSON.stringify(response.usuario)); // Salvar os dados do usuário (serializar para string)
            console.log('Token e dados do usuário salvos com sucesso!');
        }
        return response;
    } catch (error) {
        console.error("Erro ao fazer login e salvar dados:", error);
        return undefined;
    }
}

export async function getAuthToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync('userToken');
    } catch (error) {
        console.error("Erro ao obter token:", error);
        return null;
    }
}

export async function getAuthUser(): Promise<UserObject | null> {
    try {
        const userDataString = await SecureStore.getItemAsync('userData');
        if (userDataString) {
            return JSON.parse(userDataString) as UserObject;
        }
        return null;
    } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        return null;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
        console.log("Usuário deslogado e dados removidos!");
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}

export function isTokenExpired(token: string): boolean {
    if (!token) return true;
    try {
        const decodedToken: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Tempo atual em segundos
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return true; // Considerar token inválido/expirado em caso de erro
    }
}

export async function getValidAuthToken(): Promise<string | null> {
    const token = await getAuthToken();
    if (token && !isTokenExpired(token)) {
        return token;
    }
    // Se o token for inválido ou expirado, remova-o
    if (token && isTokenExpired(token)) {
        await logoutUser(); // Desloga o usuário se o token estiver expirado
    }
    return null;
}

export async function updateUsername(newUsername: string): Promise<boolean | null> {
    try {
        const response = await handleUsernameUpdate(newUsername);
        if(response?.status == 200) {
            await SecureStore.setItemAsync('userData', JSON.stringify(response.data))
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return null;
    }
}

export async function updateBairro(newBairroId: number): Promise<boolean | null> {
    try {
        const response = await handleBairroUpdate(newBairroId);
        if(response?.status == 200) {
            await SecureStore.setItemAsync('userData', JSON.stringify(response.data))
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        return null;
    }
}