# 📋 FSC Task Manager

Um gerenciador de tarefas moderno e intuitivo construído com React, TypeScript e Tailwind CSS. Este projeto oferece uma interface limpa e funcional para organizar e acompanhar suas tarefas diárias.

## Visualize o Projeto Clicando [AQUI](https://fsc-task-manager-mocha.vercel.app/)

## ✨ Funcionalidades

- **Dashboard Completo**: Visualização geral das tarefas com estatísticas em tempo real
- **Organização por Período**: Tarefas organizadas por manhã, tarde e noite
- **Status de Tarefas**: Sistema de status (pendente, em andamento, concluída)
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos
- **API REST**: Backend com JSON Server para persistência de dados
- **Gerenciamento de Estado**: Utiliza React Query para cache e sincronização de dados

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 19** - Biblioteca principal para interface
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS 4** - Framework CSS utilitário
- **React Router DOM** - Roteamento de páginas
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Gerenciamento de estado e cache
- **Axios** - Cliente HTTP para requisições

### Backend

- **JSON Server** - API REST simulada
- **Node.js** - Runtime JavaScript

### Ferramentas de Desenvolvimento

- **Vite** - Build tool e servidor de desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **Lint-staged** - Linting em arquivos staged

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/YudiYamada/fsc-task-manager.git
cd fsc-task-manager
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o backend (JSON Server)**

```bash
npm run backend
```

O backend estará disponível em `http://localhost:3000`

4. **Execute o frontend**

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento
npm run backend      # Inicia o JSON Server

# Build e Deploy
npm run build        # Gera build de produção
npm run preview      # Visualiza o build de produção

# Qualidade de Código
npm run lint         # Executa o ESLint
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AddTaskDialogue.tsx
│   ├── Button.tsx
│   ├── DashboardCard.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── TaskItem.tsx
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Home.tsx
│   ├── Tasks.tsx
│   └── TaskDetails.tsx
├── hooks/              # Custom hooks
│   └── data/
├── assets/             # Recursos estáticos
│   └── icons/
├── lib/                # Utilitários
└── App.tsx            # Componente principal
```

## 🎨 Design System

O projeto utiliza um design system personalizado com as seguintes cores:

- **Primary**: #00ADB5 (Azul turquesa)
- **Dark Blue**: #35383E (Azul escuro)
- **Background**: #F8F8F8 (Cinza claro)
- **White**: #FFFFFF (Branco)
- **Gray**: #818181 (Cinza médio)
- **Process**: #FFC107 (Amarelo para em andamento)
- **Danger**: #EF4444 (Vermelho para alertas)

## 📊 Funcionalidades Principais

### Dashboard

- Cards com estatísticas das tarefas
- Lista resumida das tarefas
- Frase motivacional

### Gerenciamento de Tarefas

- Criação de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas
- Alteração de status
- Organização por período do dia

### Organização por Período

- **Manhã**: Tarefas para o período matutino
- **Tarde**: Tarefas para o período vespertino
- **Noite**: Tarefas para o período noturno

## 🔧 Configuração do Backend

O projeto utiliza JSON Server para simular uma API REST. Os dados são armazenados no arquivo `db.json`:

```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Estudar React",
      "description": "Estudar para se tornar um bom programador",
      "time": "morning",
      "status": "completed"
    }
  ]
}
```

## 📱 Responsividade

O projeto foi desenvolvido com foco na responsividade, utilizando:

- Grid system do Tailwind CSS
- Breakpoints responsivos
- Componentes adaptáveis

## 🚀 Deploy

O projeto está configurado para deploy na Vercel com o arquivo `vercel.json` incluído.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

- **[Yudi Yamada](https://www.linkedin.com/in/yudi-yamada-0a10181b9/)**
