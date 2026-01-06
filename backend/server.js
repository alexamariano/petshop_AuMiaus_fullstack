require('dotenv').config(); 
const express = require('express');

// Importa o módulo express, que é o framework pra criar APIs
//const express = require('express');

// Importa o módulo Mongoose, que é uma biblioteca para interagir com o MongoDB
const mongoose = require('mongoose');

// Importa o módulo cors, para lidar com requisições de diferentes origens (Cross-origin CORS)
const cors = require('cors');

// Cria uma instância do Express para configurar a API
const app = express();

// Define a porta do servidor local como 3000
//const port = 3000 (porém, como alterei a porta 3000 para baixo, no app.listen
// não é mais necessário deixar essa variável ativa aqui)

// Usa o express.json() para analisar o corpo das requisições como JSON
app.use(express.json());

// Usa o cors para permitir requisições de diferentes origens (cross-origin)
app.use(cors());

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI) // substituí a string longa da url (mongodb+srv://alexdealm_db_user:LmdXLGyp1lp2ZiLs@exemplo.cpij2kx.mongodb.net/plataforma) que contém a senha pelo processo do dotenv
  .then(() => console.log("Consegui conectar ao MongoDB")) // Exibe uma msg de sucesso se a conexão for
// bem sucedida

  .catch(error => console.error("Erro ao conectar ao MongoDB", error)); // Exibe uma msg de erro se a
// conexão falhar

// Define o modelo de usuário no MongoDB
const usuarioSchema = new mongoose.Schema({
    nome_completo: String,
    email: String,
    mensagem: String
});

// Cria um modelo chamado Usuário a partir do esquema usuarioSchema
const Usuario = mongoose.model('usuarios', usuarioSchema);

// Parte do exercício anterior incluída para o projeto unificado
const servicos = [
    { id: 1, nome: "Banho e Tosa", descricao: "Banho completo com produtos hipoalergênicos." },
    { id: 2, nome: "Consulta Veterinária", descricao: "Check-up completo para a saúde do pet." },
    { id: 3, nome: "Hotelzinho", descricao: "Hospedagem segura e divertida 24h." },
];

app.get('/servicos', (req, res) => {
    res.json(servicos);
});

// Define um endpoint POST em '/cadastro' para cadastrar novos usuários
app.post('/cadastro', (req, res) => {

    //1 Obter os dados do corpo da requisição
    const {nome_completo, email, mensagem} = req.body;

    //2 Consultar o usuário pelo email no banco de dados
    Usuario.findOne({email})
      .then(emailExiste => {

        //2.1 Se já existir um usuário com esse email, retorna um erro
        if(emailExiste)
          return res.status(400).json({message: "Email já cadastrado"});

        //2.2 Cria um novo usuário com os dados fornecidos
        const novoUsuario = new Usuario({nome_completo, email, mensagem});

        //2.3 Salva o novo usuário no banco de dados
        novoUsuario.save();

        //2.4 Retorna uma mensagem de sucesso
        return res.status(200).json({message: "Cadastro realizado com sucesso."})
      })
      .catch(error => {
        console.error("Erro no cadastro", error);
        return res.status(500).json({message: "Erro no servidor."});
      });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log(`API rodando no endereço http://localhost:3000`)
});