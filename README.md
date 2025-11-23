# Chatbot de Atendimento Simulado (Fullstack)

Este projeto é um protótipo fullstack de um sistema de atendimento baseado em chat.  
Ele foi desenvolvido para simular uma tarefa real de desenvolvimento, incluindo:

- **Backend em Django + Django REST Framework**: responsável por gerenciar, persistir e responder mensagens  
- **Frontend em React**: interface que exibe o chat, histórico e controle de usuários simulados  

A solução segue uma arquitetura limpa, inspirada em **DDD (Domain-Driven Design)**, permitindo evolução futura sem impacto profundo na base de código.

---

## Tecnologias Utilizadas

### Backend

- Python 3+
- Django
- Django REST Framework
- SQLite3
- Arquitetura DDD (Domain, Application, Infrastructure)

### Frontend

- React
- Hooks e componentização modular
- Arquitetura limpa com camadas: **domain**, **usecases** e **infrastructure**

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Python 3+  
- Node.js + NPM (ou Yarn)  
- Git  

## Rodando o Backend (Django)

Para executar o backend, siga os passos abaixo detalhados:

### 1. Navegar até a pasta do backend

No terminal, execute:
cd api.chat

---

### 2. Criar um ambiente virtual

- **Windows:**
  python -m venv venv
  
- **macOS / Linux:**
  python3 -m venv venv

---

### 3. Ativar o ambiente virtual

- **Windows:**
  venv\Scripts\activate
  
- **macOS / Linux:**
  source venv/bin/activate
  
---

### 4. Instalar as dependências

pip install -r requirements.txt

> Isso instalará todas as bibliotecas necessárias para o backend funcionar.

---

### 5. Executar as migrações para criar as tabelas

python manage.py migrate

> Esse comando cria todas as tabelas no banco de dados SQLite.

---

### 6. Iniciar o servidor Django
python manage.py runserver

A API estará disponível em: `http://localhost:8000/api/`

### Frontend (React)

Para executar o frontend, siga os passos abaixo detalhados:

#### 1. Navegar até a pasta do frontend

No terminal, execute:

cd frontend

---

#### 2. Instalar as dependências

- **Usando NPM:**
  npm install

- **Usando Yarn:**
  yarn install

> Esse comando instalará todas as bibliotecas necessárias para o React funcionar.

---

#### 3. Iniciar a aplicação React

- **Usando NPM:**
  npm start

- **Usando Yarn:**
  yarn start

> A aplicação será iniciada e estará disponível em: `http://localhost:3000/`  

---

## API Endpoints

### 1. Enviar Mensagem

**POST** `/api/send/`  

Recebe uma mensagem de um usuário e retorna a mensagem criada com a resposta automática.

#### Request Body

- **user_id** (inteiro): ID do usuário que envia a mensagem  
- **text** (string): conteúdo da mensagem  

**Exemplo de Request:**

{
  "user_id": 1,
  "text": "Olá, preciso de ajuda."
}

#### Response

{
  "id": 10,
  "user_id": 1,
  "user_name": "Usuário A",
  "text": "Olá, preciso de ajuda.",
  "response": "Obrigado Usuário A, sua solicitação foi registrada e será analisada.",
  "created_at": "2025-11-22T21:30:15Z"
}

#### Erros Comuns

- `400 Bad Request`: campos obrigatórios ausentes  
- `404 Not Found`: usuário não encontrado  

---

### 2. Histórico de Mensagens

**GET** `/api/history/<user_id>/?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`  

Retorna todas as mensagens de um usuário, com opção de filtrar por período.

#### Parâmetros

- **user_id** (inteiro): ID do usuário  
- **start_date** (opcional, YYYY-MM-DD): data inicial  
- **end_date** (opcional, YYYY-MM-DD): data final  

#### Exemplo de Chamada

GET `/api/history/1/?start_date=2025-11-01&end_date=2025-11-22`

#### Response

[
  {
    "id": 10,
    "user_id": 1,
    "user_name": "Usuário A",
    "text": "Olá, preciso de ajuda.",
    "response": "Obrigado Usuário A, sua solicitação foi registrada e será analisada.",
    "created_at": "2025-11-22T21:30:15Z"
  },
  {
    "id": 5,
    "user_id": 1,
    "user_name": "Usuário A",
    "text": "Outra mensagem anterior",
    "response": "Obrigado Usuário A, sua solicitação foi registrada e será analisada.",
    "created_at": "2025-11-21T16:10:00Z"
  }
]


#### Erros Comuns

- `404 Not Found`: usuário não encontrado  
- `400 Bad Request`: formato de data inválido  

---

## Estrutura do Projeto

### Backend (Django)

core/
- domain/ 
- application/  
- infrastructure/ 

### Frontend (React)

src/
- domain/   
- usecases/  
- infrastructure/ 
- components/    
- hooks/        
- styles/         
- assets/         

---

## Decisões Técnicas

- **Arquitetura Limpa + DDD**: permite mudanças rápidas de regras, baixa dependência entre camadas, escalabilidade e manutenção mais simples  
- **Backend com DRF e Serializers**: controle dos campos expostos, consistência de dados e preparo para evolução futura  
- **Repositórios na camada Infrastructure**: toda lógica de banco isolada, incluindo filtros por data e timezone, garantindo proteção do domínio  
- **Frontend modular**: separação clara entre UI, domínio e casos de uso, facilitando alterações caso a API mude  

---

## Conclusão

O projeto foi planejado para ser simples de executar, mas robusto em arquitetura, permitindo:

- Evolução  
- Testes facilitados  
- Manutenção a longo prazo  

