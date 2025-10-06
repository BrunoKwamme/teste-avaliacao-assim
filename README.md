# 🚀 Avaliação para Desenvolvedor Assim Saúde v2.0
## Sistema de Cadastro e Relatório

Este projeto implementa um **Sistema Web Completo** seguindo uma arquitetura moderna: **Backend MVC** (Laravel) e **Frontend SPA** (React).

---

## 🛠️ Tecnologias Principais

| Camada | Tecnologia | Versão/Detalhe | Finalidade |
| :--- | :--- | :--- | :--- |
| **Backend** | **PHP** | `^8.2` | Linguagem de Programação. |
| | **Laravel** | `^12.0` | Framework MVC para a API. |
| | **MySQL** | (via XAMPP) | Banco de Dados. |
| | **XAMPP** | `8.2.12-0` (Linux) | Servidor Local (Apache e MySQL). |
| | **Composer** | | Gerenciador de dependências PHP. |
| **Frontend** | **React** | `19.1.1` | Biblioteca para a Interface (SPA). |
| | **styled-components** | | Estilização (CSS-in-JS). |
| | **Axios** | | Conexão e requisições à API. |
| | **NPM** (ou Yarn) | | Gerenciador de dependências JavaScript. |

---

## ⚙️ Instruções Detalhadas para Rodar o Projeto

**⚠️ ATENÇÃO:** Para o sistema funcionar, o **Backend (Laravel)** e o **Frontend (React)** precisam estar rodando **simultaneamente**.

### Pré-requisitos
Certifique-se de que você tem instalado e ativo:
1.  **XAMPP:** Módulos **Apache** e **MySQL** ativos.
2.  **Composer.**
3.  **NPM** (ou **Yarn**).

---

### 1. Configuração e Inicialização do Backend (Laravel)

Verifique que você está no diretório raiz do backend.

1.  **Instale as Dependências PHP:**
    ```bash
    composer install
    ```
2.  **Configure o Ambiente (`.env`):**
    * Gere a chave da aplicação:
        ```bash
        php artisan key:generate
        ```
    * Ajuste as variáveis do banco de dados no arquivo `.env` para corresponder ao seu ambiente local:
        ```ini
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=seu_nome_do_banco  # <-- **MUDE AQUI!**
        DB_USERNAME=root
        DB_PASSWORD=
        ```
3.  **Inicie o Servidor da API:**
    ```bash
    php artisan serve --port=8000
    ```
    **➡️ O Backend da API estará ativo em:** `http://127.0.0.1:8000`

---

### 2. Configuração e Inicialização do Frontend (React)

1.  **Acesse o diretório do frontend:**
    ```bash
    cd ../frontend-react
    ```
2.  **Instale as Dependências JavaScript:**
    ```bash
    npm install  # ou yarn install
    ```
3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm start # ou yarn start
    ```
    **➡️ O Frontend (SPA) estará ativo em:** `http://localhost:3000` (ou porta similar)

---

## 🌐 Endpoints da API (RESTful)

O Frontend React deve consumir a API no endereço base: `http://127.0.0.1:8000/api/`

| Funcionalidade | Endpoint | Método(s) HTTP | Descrição |
| :--- | :--- | :--- | :--- |
| **Cadastro Cargo** (CRUD) | `/api/cargos` | `GET, POST, PUT, DELETE` | Gerenciamento completo de Cargos. |
| **Cadastro Funcionário** (CRUD) | `/api/funcionarios` | `GET, POST, PUT, DELETE` | Gerenciamento de Funcionários. **Validação:** CPF deve ser único. |
| **Relatório** | `/api/relatorio/funcionarios` | `GET` | Lista de funcionários com filtros opcionais por **Nome** e/ou **Cargo**. Retorna: nome, telefone, salário e cargo. |
