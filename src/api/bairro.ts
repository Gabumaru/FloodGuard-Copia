import api from "./axiosInstance";

import { Bairro } from "../types/bairro";

export async function listBairros(): Promise<Array<Bairro> | undefined> {
    try {
        const response = (await api.get('/bairros')).data;
        return response;
    } catch (error) {
        console.error("Erro ao buscar bairros:", error);
        throw error;
    }
}