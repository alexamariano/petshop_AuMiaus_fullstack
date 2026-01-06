console.log("1. O arquivo app.js foi carregado!"); // Teste se o arquivo está conectado

// Lógica de Serviços
async function carregarServicos() {
    const lista = document.getElementById('lista-servicos');
    if(!lista) {
        console.log("Aviso: Lista de serviços não encontrada nesta página.");
        return; 
    }

    try {
        const resposta = await fetch('http://localhost:3000/servicos');
        const servicos = await resposta.json();
        
        lista.innerHTML = ''; 
        servicos.forEach(servico => {
            const item = document.createElement('li');
            item.className = 'item-servico';
            item.innerHTML = `<strong>${servico.nome}</strong>: ${servico.descricao}`;
            lista.appendChild(item);
        });
        console.log("2. Serviços carregados com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar serviços:", error);
    }
}
carregarServicos();

// Lógica de Cadastro
const formCadastro = document.getElementById('form-cadastro');

// Log de Depuração
if (formCadastro) {
    console.log("3. Oba! Encontrei o formulário de cadastro na tela.");
} else {
    console.error("3. ERRO CRÍTICO: Não encontrei o formulário! Verifique se o ID no HTML é 'form-cadastro'.");
}

if (formCadastro) {
    formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede recarregar a página
        console.log("4. Botão de cadastrar clicado!");

        // Pegando os valores
        const nome_completo = document.getElementById('cad-nome_completo').value;
        const email = document.getElementById('cad-email').value;
        const mensagem = document.getElementById('cad-mensagem').value;

        console.log("5. Dados capturados:", { nome_completo, email, mensagem });

        const usuarioData = { nome_completo, email, mensagem };

        try {
            console.log("6. Enviando para o servidor...");
            const resposta = await fetch('http://localhost:3000/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioData)
            });

            const dados = await resposta.json();
            console.log("7. Resposta do servidor:", dados);

            if (resposta.ok) {
                alert("Sucesso: " + dados.message);
                formCadastro.reset();
            } else {
                alert("Erro do Banco: " + dados.message);
            }

        } catch (erro) {
            console.error("8. Erro na conexão (fetch):", erro);
            alert("Erro de conexão. O servidor (backend) está rodando?");
        }
    });
}