Avaliação para Desenvolvedor Assim Saúde v2.0 - Sistema de Cadastro e Relatório
Este projeto implementa um sistema web seguindo a arquitetura MVC para o backend (Laravel) e uma Single Page Application (SPA) para o frontend (React), conforme os requisitos da avaliação.

🛠️ Tecnologias e Ferramentas Utilizadas
Componente

Tecnologia

Versão

Notas

Backend

PHP

(Informar a versão usada, ex: 8.2)

Linguagem principal do Laravel.

Framework Backend

Laravel

(Informar a versão usada, ex: 10.x)

Implementa a arquitetura MVC (Model, View, Controller).

Banco de Dados

MySQL

(Informar a versão)

Usado para persistência de Cargos e Funcionários.

Servidor Local

XAMPP (Linux)

(Informar a versão)

Oferece Apache e MySQL em um pacote único.

Frontend

React

(Informar a versão, ex: 18)

Utilizado para a interface de usuário (SPA).

Estilização

CSS e/ou Tailwind CSS



Design simples e responsivo.

💻 Instruções Detalhadas para Rodar o Projeto Localmente
Para iniciar o projeto, é mandatório que tanto o ambiente backend (Laravel/XAMPP) quanto o frontend (React) estejam rodando simultaneamente.

Pré-requisitos
XAMPP (Linux): Certifique-se de que os módulos Apache e MySQL estão ativos.

Composer: Gerenciador de dependências do PHP.

Node.js e NPM/Yarn: Para o frontend React.

1. Configuração do Backend (Laravel)
Assumindo que você está usando o terminal configurado para o PHP do XAMPP (/opt/lampp/bin/php):

Acesse o diretório do backend:

cd backend-laravel

Instale as dependências PHP:

composer install

Configure o arquivo de ambiente:
Duplique o arquivo .env.example e renomeie a cópia para .env.

Gere a chave da aplicação:

php artisan key:generate

Configure o Banco de Dados:
Ajuste as seguintes variáveis no seu arquivo .env para o seu banco MySQL local:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=seu_nome_do_banco
DB_USERNAME=root
DB_PASSWORD=

Inicie o Servidor da API:

php artisan serve --port=8000

O backend da API estará ativo em: http://127.0.0.1:8000

2. Configuração de CORS (Comunicação entre Front e Back)
O frontend React (rodando em uma porta diferente) precisa de permissão para acessar o backend. O Laravel já inclui o CORS nativamente.

Verifique o arquivo backend-laravel/config/cors.php e garanta que a URL do seu frontend está listada:

// config/cors.php

'allowed_origins' => ['http://localhost:3000'], // Deve corresponder à porta do React

3. Configuração do Frontend (React)
Acesse o diretório do frontend:

cd ../frontend-react

Instale as dependências JavaScript:

npm install  # ou yarn install

Inicie o Servidor de Desenvolvimento:

npm start # ou yarn start

O frontend estará ativo em: http://localhost:3000 (ou porta similar).

🗺️ Endpoints da API
O frontend React deve consumir os seguintes endpoints RESTful (Todos iniciam com http://127.0.0.1:8000/api/):

Funcionalidade

Endpoint

Método HTTP

Descrição

Cadastro Cargo (CRUD)

/api/cargos

GET, POST, PUT, DELETE

Listagem, Inclusão, Alteração e Exclusão de Cargos.

Cadastro Funcionário (CRUD)

/api/funcionarios

GET, POST, PUT, DELETE

Listagem, Inclusão, Alteração e Exclusão de Funcionários. Contém validação de CPF único e válido.

Relatório

/api/relatorio/funcionarios

GET

Lista de funcionários com filtros por nome e/ou cargo, incluindo salário e cargo.
