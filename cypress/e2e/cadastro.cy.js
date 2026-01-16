describe('Funcionalidade de Cadastro - PetShop AuMiaus', () => {

  // Antes de cada teste, visita o site e prepara o Espião
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/frontend/index.html'); // Confirme a porta!
    
    // Injeta o espião na janela para capturar alertas
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertaEspiao');
    });
  });

  it('Cenário 1: Cadastro com Sucesso (Happy Path)', () => {
    cy.get('#cad-nome_completo').type('Cliente Feliz');
    // Gera email aleatório
    const emailUnico = `teste${Math.floor(Math.random() * 99999)}@teste.com`;
    cy.get('#cad-email').type(emailUnico);
    cy.get('#cad-mensagem').type('Teste de Mensagem 1');
    
    cy.get('button[type="submit"]').click();

    // Verifica se o alerta contém "sucesso"
    cy.get('@alertaEspiao').should('have.been.calledWithMatch', /sucesso/i);
  });

  it('Cenário 2: Erro de E-mail Duplicado (Campos Novos)', () => {
    // --- PASSO A: Primeiro Cadastro (Sucesso) ---
    const emailDuplicado = `duplo${Math.floor(Math.random() * 99999)}@teste.com`;
    
    cy.log('Passo A: Criando usuário original...');
    // Ajuste os seletores (#id) conforme seu HTML real
    cy.get('#cad-nome_completo').type('Usuario Original'); 
    cy.get('#cad-email').type(emailDuplicado);
    cy.get('#cad-mensagem').type('Teste de Mensagem 2');
    
    cy.get('button[type="submit"]').click();

    // Verifica sucesso e espera o reset do formulário
    cy.get('@alertaEspiao').should('have.been.calledWithMatch', /sucesso/i);
    cy.wait(1000); 

    // --- PASSO B: Segundo Cadastro (Deve dar Erro) ---
    cy.log('Passo B: Tentando duplicar...');
    
    // O formulário foi resetado, então precisamos preencher TUDO de novo
    cy.get('#cad-nome_completo').type('Usuario Clonado');
    cy.get('#cad-email').type(emailDuplicado); // O MESMO EMAIL (Importante)
    cy.get('#cad-mensagem').type('Teste de Mensagem 3');
    
    cy.get('button[type="submit"]').click();

    // Agora sim, esperamos a segunda chamada
    cy.get('@alertaEspiao').should('have.callCount', 2);

    cy.get('@alertaEspiao').should((stub) => {
        const ultimaMensagem = stub.lastCall.args[0]; 
        expect(ultimaMensagem.toLowerCase()).to.satisfy((msg) => {
            return msg.includes('erro') || msg.includes('já cadastrado') || msg.includes('existente');
        });
    });
  });

  it('Cenário 3: Validação de Formato de E-mail (HTML5)', () => {
    cy.get('#cad-nome_completo').type('Sem Arroba');
    cy.get('#cad-email').type('emailsemarroba.com'); // Inválido
    cy.get('button[type="submit"]').click();

    // Aqui não tem alerta, o navegador bloqueia antes.
    // Verificamos a propriedade de validação do input
    cy.get('#cad-email').then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

});