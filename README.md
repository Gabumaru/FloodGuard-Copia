# 🌧️ FloodGuard – Previsão de Enchentes

**FloodGuard** é um aplicativo mobile criado como projeto de extensão do curso de Análise e Desenvolvimento de Sistemas. Seu objetivo é fornecer alertas sobre riscos de enchentes para moradores de áreas vulneráveis, promovendo segurança e consciência coletiva.

## 📱 Funcionalidades

- **Telas de Boas-Vindas:** Introdução ao aplicativo e navegação inicial amigável.
- **Login e Cadastro:** Tela para criação de conta e autenticação de usuários.
- **Tela de Alertas:** Exibe avisos em tempo real sobre enchentes e situações de risco.
- **Fórum:** Espaço comunitário para discussões, dúvidas e denúncias de spam.
- **Mapa:** Visualização de áreas afetadas e pontos monitorados por sensores.
- **Configurações:** Personalização de preferências e notificações do usuário.

## ⚙️ Tecnologias Utilizadas

- **React Native** (framework principal)
- **Expo** (facilita desenvolvimento e testes)
- **React Navigation** (gerenciamento de rotas)
- **Axios** (consumo de APIs)

## 🛠️ Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/floodguard-app/floodguard-app.git
   cd floodguard-app
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto com Expo:
   ```bash
   npx expo start
   ```

4. Use o app Expo Go no seu celular para escanear o QR code.



## 📦 Estrutura de Pastas (resumida)
```
/assets          → ícones, imagens e recursos visuais do app  
/api             → chamadas centralizadas à API (ex: funções de requisição REST)  
/components      → componentes reutilizáveis da interface (botões, cards, inputs etc.)  
/routes          → definição de rotas e navegação entre telas do app  
/screens         → telas principais do app (Login, Mapa, Alertas, Fórum etc.)  
/services        → lógica de conexão com serviços externos (ex: Firebase, notificações)  
/types           → definições de tipos TypeScript, interfaces e enums  
/utils           → funções utilitárias reutilizáveis (ex: tratamento de datas, formatações)
```

## 👨‍💻 Equipe

- Bruno de Almeida Otero  
- Gabriel Jefferson  
- Gustavo Dias  
- Leonardo Correia  

## 📄 Licença

Projeto acadêmico. Livre para fins educacionais e não comerciais.