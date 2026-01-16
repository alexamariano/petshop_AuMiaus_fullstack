# 🐾 PetShop AuMiaus - Sistema Full Stack

![Status do Projeto](https://img.shields.io/badge/Status-Concluído-green)

Bem-vindo ao repositório do **PetShop AuMiaus**! Este é um projeto **Full Stack** desenvolvido para simular o sistema de uma clínica veterinária e petshop, integrando uma interface web moderna com um servidor backend e banco de dados na nuvem.

## 🎯 Objetivo do Projeto

O objetivo principal foi criar uma aplicação funcional que conecta as três camadas do desenvolvimento web:
1.  **Frontend:** Interface para o usuário interagir.
2.  **Backend:** API para processar regras de negócio.
3.  **Database:** Persistência segura dos dados.

## 🚀 Tecnologias Utilizadas

### Frontend (Cliente)
* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **Estrutura:** Semântica e acessível.
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) **Estilo:** Design responsivo e uso de Flexbox.
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **Lógica:** Manipulação do DOM e consumo de API via `fetch()`.

### Backend (Servidor)
* ![NodeJS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) **Ambiente:** Execução de JavaScript no servidor.
* ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) **Framework:** Criação de rotas e API REST.
* **Dotenv:** Gerenciamento seguro de variáveis de ambiente.
* **Cors:** Liberação de acesso para requisições do frontend.

### Banco de Dados
* ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) **Atlas:** Banco de dados NoSQL na nuvem.
* **Mongoose:** Modelagem de dados (Schema) e conexão.

---

## ⚙️ Funcionalidades

* ✅ **Listagem de Serviços:** O site consome uma API (método GET) para exibir os serviços disponíveis dinamicamente.
* ✅ **Cadastro de Usuários:** Formulário funcional que envia dados (método POST) para o servidor.
* ✅ **Validação de Backend:** O sistema verifica se o e-mail já está cadastrado no MongoDB antes de salvar.
* ✅ **Feedback Visual:** Alertas de "Sucesso" ou "Erro" aparecem para o usuário após a tentativa de cadastro.

---

## 🛠️ Como rodar este projeto na sua máquina

Siga este passo a passo para testar a aplicação:

### 1. Clone o repositório
```bash
git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)

```

## 📡 Rotas da API

| Método | Rota        | Descrição                           |
| :----- | :---------- | :---------------------------------- |
| `GET`  | `/servicos` | Retorna a lista de serviços do PetShop |
| `POST` | `/cadastro` | Recebe JSON com dados do usuário e salva no Banco |

## 🧪 Testes Automatizados (QA)
O projeto conta com testes End-to-End (E2E) desenvolvidos em Cypress, garantindo:
* ✅ Cadastro com sucesso (Happy Path)
* ✅ Bloqueio de e-mails duplicados (Validação Backend)
* ✅ Validação de formulário HTML5

![Print dos Testes Passando](./print-teste.jpg)

👨‍💻 Autor
Desenvolvido por Alex Mariano


Entre em contato: https://www.linkedin.com/in/alex-almeida-mariano/

Este projeto foi desenvolvido como parte de estudos em Desenvolvimento Full Stack.