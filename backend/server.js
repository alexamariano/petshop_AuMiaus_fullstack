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

// Rota de Cadastro Corrigida com ASYNC/AWAIT
app.post('/cadastro', async (req, res) => {
    console.log("--- NOVA TENTATIVA DE CADASTRO ---"); // LOG 1
    const { nome_completo, email, mensagem } = req.body;
    console.log("Recebi dados:", email); // LOG 2

    try {
        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            console.log("E-mail já existe! Retornando Erro 400."); // LOG 3
            return res.status(400).json({ message: "Erro: Email já cadastrado" });
        }

        const novoUsuario = new Usuario({ nome_completo, email, mensagem });
        await novoUsuario.save();
        
        console.log("Salvo com sucesso! Retornando 201."); // LOG 4
        res.status(201).json({ message: "Cadastro realizado com sucesso." });

    } catch (error) {
        console.error("ERRO FATAL:", error); // LOG DE ERRO
        res.status(500).json({ message: "Erro interno ao salvar." });
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log(`API rodando no endereço http://localhost:3000`)
});