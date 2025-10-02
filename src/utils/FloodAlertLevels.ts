// src/utils/FloodAlertLevels.ts

export interface AlertLevelConfig {
    level: number;
    name: string;
    color: string;
    textColor: string;
    actionMessage: string;
}

export const ALERT_LEVELS: AlertLevelConfig[] = [
    {
        level: 1, 
        name: 'Sem Risco',
        color: '#5cb85c', // Verde
        textColor: '#333333', 
        actionMessage: 'Nenhuma medida necessária. Tempo estável, apenas acompanhe as atualizações no app.',
    },
    {
        level: 2, 
        name: 'Atenção',
        color: '#f0ad4e', // Amarelo
        textColor: '#333333',
        actionMessage: 'Chuvas leves/moderadas previstas. Dicas: Evite jogar lixo nas ruas e, se possível, coloque pequenos batentes nas portas de entrada.',
    },
    {
        level: 3, 
        name: 'Alerta',
        color: '#ff8c00', // Laranja
        textColor: 'white',
        actionMessage: 'Chuvas fortes previstas e risco médio. Dicas: Suba móveis e eletrodomésticos. Guarde documentos e objetos importantes em local seguro e protegido.',
    },
    {
        level: 4, 
        name: 'Perigo',
        color: '#d9534f', // Vermelho
        textColor: 'white',
        actionMessage: 'RISCO ALTO DE ENCHENTES. \nDicas: Se estiver em área de risco, prepare-se para sair rapidamente. Desligue aparelhos elétricos e feche o registro de energia/gás.',
    },
    {
        level: 5, 
        name: 'Emergência',
        color: '#6f42c1', // Roxo
        textColor: 'white',
        actionMessage: 'Enchente em andamento ou iminente. Ação Imediata: Procure imediatamente um local seguro e mais alto. NÃO tente atravessar ruas alagadas. Siga orientações da Defesa Civil.',
    },
];

// Função de utilidade para buscar a configuração por nível
export const getAlertConfig = (level: number): AlertLevelConfig => {
    return ALERT_LEVELS.find(config => config.level === level) || ALERT_LEVELS[0];
};

// Nova função para mapear o valor do Slider (0-100) para o Nível de Alerta (1-5)
export const mapValueToAlertLevel = (value: number): number => {
    if (value >= 81) return 5; 
    if (value >= 61) return 4;
    if (value >= 41) return 3;
    if (value >= 21) return 2;
    return 1;
};