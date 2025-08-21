export interface ComentarioCreatePayload {
    conteudo: string;
}

export interface ComentarioResponse {
    id: number;
    conteudo: string;
    horarioEnvio: string;
    statusRestricao: boolean;
    idUsuario: number;
    nomeUsuario: string;
}