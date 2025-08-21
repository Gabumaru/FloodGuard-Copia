export interface UserObject {
    id: number,
    email: string,
    nomeUsuario: string,
    idBairro?: number,
    password?: string,
    dataRegistro?: string
}

export interface UserLoginObject {
    token: string,
    usuario: UserObject
}