import axios from 'axios';

// O endereço IP do seu computador na rede Wi-Fi.
// Lembre-se de que este IP pode mudar.
const API_BASE_URL = 'http://192.168.3.106:5000/'; 

// Interface para a nova resposta estruturada vinda da API Python com Gemini.
// É uma boa prática definir os tipos de dados que você espera receber.
export interface GeminiAnalysisResponse {
    location_name: string;
    alert: {
        level: number;       // Nível numérico do alerta (ex: 0, 1, 2, 3)
        level_name: string;  // Nome do alerta (ex: "Sem Risco", "Alerta Amarelo")
        message: string;     // Mensagem curta e direta para o usuário
    };
    analysis: {
        summary: string;        // Análise técnica da situação
        recommendations: string; // Recomendações e ações para o usuário
    };
    nearby_forecasts: string[];
    }

    /**
     * Busca a previsão de enchente da API.
     * Agora a função precisa do ID da estação, latitude e longitude para funcionar.
     * @param stationId O identificador da estação meteorológica (ex: 'A755_BARUERI')
     * @param lat A latitude do usuário
     * @param lon A longitude do usuário
     * @returns Uma promessa com os dados da análise da API.
     */
    export async function getFloodAlert(
    stationId: string, 
    lat: number, 
    lon: number
    ): Promise<GeminiAnalysisResponse> {
    // Constrói a URL completa, incluindo a estação e os parâmetros de query 'lat' e 'lon'
    const endpoint = `${API_BASE_URL}/predict?lat=${lat}&lon=${lon}`;
    
    try {
        console.log(`Buscando previsão do servidor: ${endpoint}`);
        const response = await axios.get<GeminiAnalysisResponse>(endpoint);
        console.log('Previsão recebida com sucesso:', response.data);
        return response.data;

    } catch (error) {
        console.error('Erro detalhado ao buscar previsão da API:', error);
        
        // Em vez de retornar um objeto de erro falso, nós relançamos o erro.
        // Isso permite que a tela que chamou a função (a Home) trate o erro
        // e exiba uma mensagem mais apropriada para o usuário.
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response 
                ? `Erro do servidor: ${error.response.status}. Verifique se a API está funcionando.` 
                : 'Erro de rede. Não foi possível conectar ao servidor. Verifique o IP e a sua conexão Wi-Fi.';
            throw new Error(errorMessage);
        }
        // Para qualquer outro tipo de erro inesperado
        throw new Error('Ocorreu um erro desconhecido ao processar sua solicitação.');
    }
}
