import api from "./axiosInstance";
import { ComentarioCreatePayload, ComentarioResponse } from "../types/comentario";

/**
 * Cria um novo comentário.
 * @param conteudo O conteúdo do comentário.
 * @param token O token JWT do usuário autenticado.
 * @returns O comentário criado.
 */
export async function createComentario(conteudo: string): Promise<ComentarioResponse> {
    try {
        const payload: ComentarioCreatePayload = { conteudo };
        const response = await api.post('/comentarios', payload);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        throw error;
    }
}

/**
 * Lista todos os comentários, ordenados por data de envio (mais recentes primeiro).
 * @returns Uma lista de comentários.
 */
export async function listComentarios(): Promise<ComentarioResponse[]> {
    try {
        const response = await api.get('/comentarios');
        return response.data;
    } catch (error) {
        console.error("Erro ao listar comentários:", error);
        throw error;
    }
}