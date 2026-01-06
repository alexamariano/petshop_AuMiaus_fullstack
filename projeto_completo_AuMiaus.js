//1 Importações
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//2 Configuração do APP
const app = express();
const port = 3000;

//3 Configurações de uso (JSON e CORS)
app.use(express.json());
app.use(cors());

//4 Conexão com MongoDB
mongoose.connect("mongodb+srv://alexdealm_db_user:LmdXLGyp1lp2ZiLs@exemplo.cpij2kx.mongodb.net/plataforma")
    .then(() => console.log("Conectado ao MongoDB com sucesso!"))
    .catch(error => console.error("Erro ao conectar ao MongoDB:", error));

//5 Modelos do banco (schemas)
const usuarioSchema = new mongoose.Schema({
    nome: String,
    sobrenome: String,
    email: String,
    senha: String
});
const Usuario = mongoose.model('usuarios', usuarioSchema);

//6 Dados locais (array de serviços)
const servicos = [
    { id: 1, nome: "Banho e Tosa", descricao: "Banho completo com produtos hipoalergênicos." },
    { id: 2, nome: "Consulta Veterinária", descricao: "Check-up completo para a saúde do pet." },
    { id: 3, nome: "Hotelzinho", descricao: "Hospedagem segura e divertida 24h." },
];

//7 Rotas da API
//7.1. Rota de Teste (Raiz)
app.get('/', (req, res) => {
    res.send('Servidor AuMiaus Unificado rodando!');
});

//7.2. Rota para Listar Serviços (Vem do Array)
app.get('/servicos', (req, res) => {
    res.json(servicos);
});

//7.3. Rota para Cadastro de Usuário (Vai para o MongoDB)
app.post('/cadastro', (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;
    // Verifica se usuário já existe
    Usuario.findOne({ email })
        .then(emailExiste => {
            if (emailExiste) {
                return res.status(400).json({ message: "Email já cadastrado" });
            }

            //7.4 Cria e salva o novo usuário
            const novoUsuario = new Usuario({ nome, sobrenome, email, senha });
            
            novoUsuario.save()
                .then(() => {
                    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
                })
                .catch(err => {
                    console.error("Erro ao salvar:", err);
                    res.status(500).json({ message: "Erro ao salvar no banco." });
                });
        })
        .catch(error => {
            console.error("Erro na busca:", error);
            res.status(500).json({ message: "Erro interno no servidor." });
        });
});

//8 Inicialização
app.listen(port, () =>{
    console.log('Servidor rodando em http://localhost:${port}');
});