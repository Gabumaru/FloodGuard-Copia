import axios from "axios";
import api from "./axiosInstance";
import { UserObject, UserLoginObject } from "../types/user";

export async function handleRegister(email: string, password: string): Promise<UserLoginObject | undefined> {
    try {
        const registeredUser = (await axios.post('https://server-production-c670.up.railway.app/api/usuarios/cadastro', {email, password})).data;
        return registeredUser;
    }
    catch (error) {
        console.error(error);
        return;
    }
}

export async function handleLogin(email: string, password: string): Promise<UserLoginObject | undefined> {
    try {
        const response = (await axios.post('https://server-production-c670.up.railway.app/api/usuarios/login', {email, password})).data;
        return response;
    } catch (error) {
        console.error("Erro na requisição de login: ", error);
        throw error;
    }
}

export async function handleUsernameUpdate(newUsername: string): Promise<{data: UserObject, status: number} | undefined> {
    try {
        const response = (await api.patch('/usuarios/nomeUsuario', newUsername, {
            headers: { 'Content-Type': 'text/plain' } // String bruta
        }));
        return {data: response.data, status: response.status};
    } catch (error) {
        console.error("Erro ao atualizar nome de usuário: ", error);
        throw error;
    }
}

export async function handleBairroUpdate(newBairroId: number): Promise<{data: UserObject, status: number} | undefined> {
    try {
        const response = (await api.patch('/usuarios/bairro', newBairroId));
        return {data: response.data, status: response.status};
    } catch (error) {
        console.error("Erro ao atualizar bairro: ", error);
        throw error;
    }
}