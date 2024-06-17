// CONSTS BOTÕES
const form = document.getElementById("loginForm");
const botaoCentral = document.getElementById("loginButton");
const botaoEsquerdo = document.getElementById("esquerdaButton");
const botaoDireito = document.getElementById("direitaButton");

// FUNÇÕES

// PAINEIS
function painelLogin() {
    // MOSTRA PAINEL PARA REALIZAR LOGIN

    document.getElementById("loginForm").innerHTML=`
    <label id="emailLabel" for="emailInput">Email</label>
    <input id="emailInput" type="email" name="email">

    <label id="senhaLabel" for="senhaInput">Senha</label>
    <input id="senhaInput" type="password" name="senha" autocomplete="on">
    `;

    botaoCentral.innerText="Login";
    botaoEsquerdo.innerText="Esqueci a senha";
    botaoDireito.innerText="Cadastrar-se";
};

function painelCadastro() {
    // MOSTRA PAINEL PARA REALIZAR CADASTRO

    document.getElementById("loginForm").innerHTML=`
    <label id="nomeLabel" for="nomeInput">Nome de usuário</label>
    <input id="nomeInput" type="text" name="nome">

    <label id="emailLabel" for="emailInput">Email</label>
    <input id="emailInput" type="email" name="email">

    <label id="senhaLabel" for="senhaInput">Senha</label>
    <input id="senhaInput" type="password" name="senha" autocomplete="off">

    <label id="senhaLabel2" for="senhaInput2">Senha Novamente</label>
    <input id="senhaInput2" type="password" name="senha2" autocomplete="off">
    `;

    botaoCentral.innerText="Cadastrar-se";
    botaoEsquerdo.innerText="Visualizar senha";
    botaoDireito.innerText="Voltar ao login";
};

function painelTrocaSenha(email) {
    // MOSTRA PAINEL PARA REALIZAR TROCA DE SENHA

    document.getElementById("loginForm").innerHTML=`
        <div id="canvasDiv">
            <canvas id="captchaCanvas" width="150" height="50"></canvas>
        </div>

        <label id="captchaLabel" for=" captchaInput">Captcha</label>
        <input id="captchaInput" type="text" name="captcha">

        <label id="emailLabel" for="emailInput" style="display: none">Email</label>
        <input id="emailInput" type="email" name="email" value=${email} style="display: none">

        <label id="senhaLabel" for="senhaInput">Nova senha</label>
        <input id="senhaInput" type="password" name="senha" autocomplete="off">

        <label id="senhaLabel" for="senhaInput">Nova senha</label>
        <input id="senhaInput2" type="password" name="senha2" autocomplete="off">
    `;

    botaoCentral.innerText="Trocar senha";
    botaoEsquerdo.innerText="Visualizar senha";
    botaoDireito.innerText="Voltar ao login"

    // REALIZA AÇÕES NECESSARIAS PARA FORMAR O CAPTCHA
    capV = geraCaptcha();
};

// LOGIN/CADASTRO APROVADOS
function loginAprovado(nome) {
    // MOSTRA LOGIN APROVADO
    document.querySelector("main").innerHTML=`
        <h1>Login Aprovado</h1>
        <h1>Aguarde alguns segundos</h1>
        <h1>Estamos redirecionando você!</h1>
    `;

    // MANDA PAGINA LOGIN
    setTimeout(() => {
        window.location.href = `../login/index.html?nome=${nome}`;
    }, 4000);
};

function CadastroAprovado() {
    // MOSTRA CADASTRO APROVADO
    document.querySelector("main").innerHTML=`
        <h1>Cadastro Aprovado</h1>
        <h1>Aguarde alguns segundos e</h1>
        <h1>Realize seu login!</h1>
    `;

    // MANDA PAGINA PARA REALIZAR LOGIN
    setTimeout(() => {
        window.location.reload();
    }, 4000);
};

function trocaSenhaAprovada() {
    // MOSTRA CADASTRO APROVADO
    document.querySelector("main").innerHTML=`
        <h1>Troca Aprovada</h1>
        <h1>Aguarde alguns segundos e</h1>
        <h1>Realize seu login!</h1>
    `;

    // MANDA PAGINA PARA REALIZAR LOGIN
    setTimeout(() => {
        window.location.reload();
    }, 4000);
};

function loginEncontradoAutomaticamente() {
    // MOSTRA LOGIN APROVADO
    document.querySelector("main").innerHTML=`
        <h1>Login Encontrado Automaticamente</h1>
        <h1>Aguarde alguns segundos</h1>
        <h1>Estamos redirecionando você!</h1>
    `;

    // MANDA PAGINA LOGIN
    setTimeout(() => {
        window.location.href = "../login/index.html"
    }, 4000);
};

// LOGIN
function chamaLogin(dadosLogin) {
    try {
        // VERIFICA POSSIVEIS CAMPOS EM BRANCO
        verificaCamposEmBrancoLogin();

        // PROCURA O LOGIN E ARMAZENA INFORMAÇÕES RECEBIDAS
        const respostaLogin = encontraCadastros(dadosLogin);

        // VERIFICA POSSIVEIS ERROS OCORRIDOS E OS ENVIA PARA SEREM TRATADOS
        verificaErrosLogin(respostaLogin);

        // AVISA E REALIZA O LOGIN APROVADO
        loginAprovado(respostaLogin);
    } catch(erro) {
        // TRATA POSSIVEIS ERROS RECEBIDOS
        trataErrosLogin(erro.message);
    };
};

function verificaCamposEmBrancoLogin() {
    // VERIFICA OS CAMPOS QUE POSSIVELMENTE PODEM ESTAR EM BRANCO
    if(document.getElementById("emailInput").value === "") {throw new Error("Digite seu email")};
    if(document.getElementById("senhaInput").value === "") {throw new Error("Digite sua senha")};
};

function encontraCadastros(dadosLogin) {
    // VARIAVEL CONTENDO OS CADASTROS
    const cadastro = localStorage.getItem("loginAutenticaTesteStaticVersion");

    // VARIVEIS USADAS PARA IDENTIFICAR EMAIL E SENHA DO LOGIN COMO ENCONTRADOS OU NÃO ENCONTRADAS
    let email = false;
    let senha = false;
    let indice;

    // PROCURA CADASTROS
    const cadastros = cadastro.split(",");

    for(let i = 0; i < cadastros.length; i++) {
        const emailDigitado = dadosLogin.email;
        const senhaDigitada = dadosLogin.senha;

        if(emailDigitado === cadastros[i].split("/")[1]) {email = true};
        if(senhaDigitada === cadastros[i].split("/")[2]) {senha = true};

        if(email === true && senha === true) {
            indice = i;
            i = cadastros.length;
        };
    };

    // RETORNA INFORMAÇÕES ENCONTRADAS E NÃO ENCONTRADAS PARA REALIZAR OU NÃO O LOGIN
    if(email === false) {return {Erro: "Email não encontrado"}}
    if(email === true && senha === false) {return {Erro: "Senha inválida"}} else
    if(email === true && senha === true) {return cadastros[indice].split("/")[0]};
};

function verificaErrosLogin(respostaLogin) {
    // IDENTIFICA POSSIVEIS ERROS E MANDA ELE PARA SEREM TRATADOS DE FORMA CORRETA
    if(Object.keys(respostaLogin)[0] === "Erro") {throw new Error(respostaLogin["Erro"])};  
};

function trataErrosLogin(erro) {
    // RECEBE POSSIVEIS ERROS E OS TRATA DA MELHOR FORMA
    if(erro === "Digite seu email" || erro === "Digite sua senha") {
        document.getElementById("emailInput").placeholder="Digite seu email";
        document.getElementById("senhaInput").placeholder="Digite sua senha";
    };

    if(erro === "Email não encontrado") {
        document.getElementById("emailInput").value=""
        document.getElementById("emailInput").placeholder=erro;
    };
    
    if(erro === "Senha inválida") {
        document.getElementById("senhaInput").value=""
        document.getElementById("senhaInput").placeholder=erro;
    };
};

// CADASTRAR-SE

function chamaCadastro() {
    try {
        verificaCamposEmbrancoCadastro();

        verificaErrosSenhaCadastro();

        verificaSenhaSegura();

        verificaDadosJaUtilizados();

        armazenaDadosLoginNoNavegador();

        CadastroAprovado();
    } catch(erro) {
        trataErrosCadastro(erro.message);
    };
};

function verificaCamposEmbrancoCadastro() {
    // VERIFICA POSSIVEIS CAMPOS EM BRANCO AO TENTAR CADASTRAR-SE
    if(document.getElementById("nomeInput").value === "") {throw new Error("Digite seu nome")};
    if(document.getElementById("emailInput").value === "") {throw new Error("Digite seu email")};
    if(document.getElementById("senhaInput").value === "") {throw new Error("Digite sua senha")};
};

function verificaDadosJaUtilizados() {
    if(localStorage.getItem("loginAutenticaTesteStaticVersion") !== null) {
        // VERIFICA POSSIVEIS DADOS DIGITADOS QUE PODEM JÁ ESTAREM SENDO USADOS
        const nome = document.getElementById("nomeInput").value;
        const email = document.getElementById("emailInput").value;
    
        // VERIFICA DADOS
        const dados = localStorage.getItem("loginAutenticaTesteStaticVersion").split(",");
    
        for(let i = 0; i < dados.length; i++) {
            const nomesUtilizados = dados[i].split("/")[0];
            const emailsUtilizados = dados[i].split("/")[1];
    
            if(nome === nomesUtilizados) {throw new Error("Nome já utilizado")};
            if(email === emailsUtilizados) {throw new Error("Email já utilizado")};
        };
    };
};

function verificaErrosSenhaCadastro() {   
    // VERIFICA POSSIVEIS ERROS RELACIONADOS A SENHA AO CADASTRAR-SE
    if(document.getElementById("senhaInput").value !== document.getElementById("senhaInput2").value) {throw new Error("Sua senha precisa seu igual a acima")};
};

function verificaSenhaSegura() {
    const senha = (document.getElementById("senhaInput").value);
    console.log(senha);

    if(!/[A-Z]/.test(senha)) {throw new Error("Sua senha deve conter no minimo 6 caracteres incluindo letras maiusculas, minusculas e numeros")};
    if(!/[a-z]/.test(senha)) {throw new Error("Sua senha deve conter no minimo 6 caracteres incluindo letras maiusculas, minusculas e numeros")};
    if(!/\d/.test(senha)) {throw new Error("Sua senha deve conter no minimo 6 caracteres incluindo letras maiusculas, minusculas e numeros")};
    if(senha.length < 6) {throw new Error("Sua senha deve conter no minimo 6 caracteres incluindo letras maiusculas, minusculas e numeros")};
};

function trataErrosCadastro(erro) {
    // TRATA POSSIVEIS ERROS DA MELHOR FORMA
    if(erro === "Digite seu nome") {
        document.getElementById("nomeInput").placeholder=erro;
    };

    if(erro === "Digite seu email") {
        document.getElementById("emailInput").placeholder=erro;
    };

    if(erro === "Digite sua senha") {
        document.getElementById("senhaInput").placeholder=erro;
    };

    if(erro === "Sua senha precisa seu igual a acima") {
        document.getElementById("senhaInput2").value="";
        document.getElementById("senhaInput2").placeholder=erro;
    };

    if(erro === "Nome já utilizado") {
        document.getElementById("nomeInput").value="";
        document.getElementById("nomeInput").placeholder=erro;
    };

    if(erro === "Email já utilizado") {
        document.getElementById("emailInput").value="";
        document.getElementById("emailInput").placeholder=erro; 
    };

    if(erro === "Sua senha deve conter no minimo 6 caracteres incluindo letras maiusculas, minusculas e numeros") {
        document.getElementById("senhaInput").value="";
        document.getElementById("senhaInput2").value="";
        alert(erro);
    };
};

function armazenaDadosLoginNoNavegador() {
    // DADOS NECESSARIOS PARA ACESSO
    const dadosLogin = new FormData(document.getElementById("loginForm"));
    const nome = dadosLogin.get("nome");
    const email = dadosLogin.get("email");
    const senha = dadosLogin.get("senha");

    // ARMAZENA DADOS DE LOGIN NO NAVEGADOR
    if(localStorage.getItem("loginAutenticaTesteStaticVersion") === null) {
        localStorage.setItem("loginAutenticaTesteStaticVersion", nome+"/"+email+"/"+senha);
    } else {
        localStorage.setItem("loginAutenticaTesteStaticVersion", localStorage.getItem("loginAutenticaTesteStaticVersion") + "," + nome+"/"+email+"/"+senha);
    };
};

// TROCA SENHA(VERIFICA LOGIN E AUTORIZA TROCA DE SENHA)
function esqueciSenha() {
    // ARMAZENA EMAIL E SENHA
    const email = document.getElementById("emailInput").value;
    const senha = document.getElementById("senhaInput").value;

     try {
        // VERIFICA POSSIVEIS CAMPOS EM BRANCO
        verificaCamposEmBrancoEsqueciSenha();

        // VERIFICA SE EMAIL E SENHA CORRESPONDEM A ALGUM CADASTRO NO SERVIDOR
        const verificaLogin = VerificaLogin(email, senha);

        // IDENTIFICA POSSIVEIS ERROS E OS ENVIA PARA SEREM TRATADOS DA MELHOR FORMA
        verificaErrosLogin(verificaLogin);

        // ENVIA PAINEL PARA REALIZAR A TROCA DA SENHA
        painelTrocaSenha(email);        
     } catch(erro) {
        // TRATA POSSIVEIS ERROS RECEBIDOS DA MELHOR FORMA
        trataErrosEsqueciSenha(erro.message);
     }
};

function visualizarSenha() {
    if(document.getElementById("senhaInput").type === "password") {
        document.getElementById("senhaInput").type = "text";
        document.getElementById("senhaInput2").type = "text";
    } else {
        document.getElementById("senhaInput").type = "password";
        document.getElementById("senhaInput2").type = "password";
    };
};

function verificaCamposEmBrancoEsqueciSenha() {
    // VERIFICA POSSIVEIS CAMPOS EM BRANCO
    if(document.getElementById("emailInput").value === "" || document.getElementById("senhaInput").value === "") {
        throw new Error("Campos em branco");
    };
};

function VerificaLogin(emailRecebido, senhaRecebida) {
    // VARIAVEL CONTENDO OS CADASTROS
    const cadastro = localStorage.getItem("loginAutenticaTesteStaticVersion");

    console.log(cadastro);

    // VARIVEIS USADAS PARA IDENTIFICAR EMAIL E SENHA DO LOGIN COMO ENCONTRADOS OU NÃO ENCONTRADAS
    let email = false;
    let senha = false;

    // PROCURA CADASTROS
    const cadastros = cadastro.split(",");

    for(let i = 0; i < cadastros.length; i++) {

        if(emailRecebido === cadastros[i].split("/")[1]) {email = true};
        if(senhaRecebida === cadastros[i].split("/")[2]) {senha = true};

        if(email === true && senha === true) {
            indice = i;
            i = cadastros.length;
        };
    };

    // RETORNA INFORMAÇÕES ENCONTRADAS E NÃO ENCONTRADAS PARA REALIZAR OU NÃO O LOGIN
    if(email === false) {return {Erro: "Email inválido"}}
    if(email === true && senha === false) {return {Erro: "Senha inválida"}} else
    if(email === true && senha === true) {return true};
};

function verificaErrosLogin(login) {
    // IDENTIFICA POSSIVEIS ERROS E OS ENVIA PARA SEREM TRATADOS DA MELHOR FORMA
    if(Object.keys(login)[0] === "Erro") {throw new Error(login["Erro"])}
}

// TROCA SENHA(LOGIN VERIFICADO E AUTORIZADO PARA TROCA DE SENHA)
function verificaDadostrocaSenha(dadosLogin) {
    try {
        // VERIFICA POSSIVEIS ERROS
        const camposVerificados = verificaCamposTrocaSenha(dadosLogin);

        // IDENTIFICA POSSIVEIS ERROS E OS ENVIA PARA SEREM TRATADOS DA MELHOR FORMA
        verificaErrosTrocaSenha(camposVerificados);

        // REALIZA A TROCA DE SENHA
        trocaSenha(dadosLogin);
        
        // ENVIA PAINEL PARA MOSTRAR O SUCESSO EM TROCAR A SENHA
        trocaSenhaAprovada(dadosLogin);
    } catch(erro) {
        // TRATA POSSIVEIS ERROS DA MELHOR FORMA
        alert(erro);
        trataErrosEsqueciSenha(erro.message);
    };
};

function verificaCamposTrocaSenha(dadosLogin) {
    // VERIFICA POSSIVEIS ERROS AO TENTAR REALIZAR A TROCA DE SENHA
    if(dadosLogin.captcha.toUpperCase() !== capV.toUpperCase()) {throw new Error("Captcha inválido")};
    if(dadosLogin.senha === "") {throw new Error("Você precisa digitar sua senha")};
    if(dadosLogin.senha2 === "") {throw new Error("Você precisa digitar sua senha novamente")}
    if(dadosLogin.senha !== dadosLogin.senha2) {throw new Error("Sua senha precisa seu igual a acima")};
};

function verificaErrosTrocaSenha(resposta) {
    // IDENTIFICA POSSIVEIS ERROS E OS ENVIA PARA SEREM TRATADOS DA MELHOR FORMA
    if(Object.keys(fetch)[0] === "Erro") {throw new Error(fetch["Erro"])};
};

function trocaSenha(dadosLogin) {
    const email = dadosLogin.email;
    const senha = dadosLogin.senha;

    let cadastrosEncontrados = localStorage.getItem("loginAutenticaTesteStaticVersion").split(",");
    let cadastros = [];

    for(let i = 0; i < cadastrosEncontrados.length; i++) {
        cadastros.push(cadastrosEncontrados[i]);
    };

    for(let i = 0; i < cadastros.length; i++) {
        if(cadastros[i].split("/")[1] === email) {
            cadastros[i] = `${cadastros[i].split("/")[0]}/${cadastros[i].split("/")[1]}/${senha}`

            localStorage.removeItem("loginAutenticaTesteStaticVersion");
            localStorage.setItem("loginAutenticaTesteStaticVersion", cadastros);
        };
    };
};

function trataErrosEsqueciSenha(erro) {
    // TRATA POSSIVEIS ERROS RECEBIDOS DA MELHOR FORMA
    if(erro === "Campos em branco") {
        document.getElementById("emailInput").placeholder = "Digite seu email";
        document.getElementById("senhaInput").placeholder = "Digite sua senha";
    };

    if(erro === "Email inválido") {
        document.getElementById("emailInput").value = "";
        document.getElementById("emailInput").placeholder = erro;
    };

    if(erro === "Senha inválida") {
        document.getElementById("senhaInput").value = "";
        document.getElementById("senhaInput").placeholder = erro;
    };

    if(erro === "Captcha inválido") {
        document.getElementById("captchaInput").value = "";
        document.getElementById("captchaInput").placeholder = erro;
    };

    if(erro === "Você precisa digitar sua senha") {
        document.getElementById("senhaInput").value = "";
        document.getElementById("senhaInput").placeholder = "Digite sua senha";
        document.getElementById("senhaInput2").value = "";
    };

    if(erro === "Você precisa digitar sua senha novamente") {
        document.getElementById("senhaInput2").value = "";
        document.getElementById("senhaInput2").placeholder = "Digite sua senha novamente";
    };

    if(erro === "Sua senha precisa seu igual a acima") {
        document.getElementById("senhaInput2").value = "";
        document.getElementById("senhaInput2").placeholder = "Senha diferente da acima";
    };

    if(erro === "Sua senha deve conter no minimo 6 caracteres incluindo letras maiusculas, minusculas e numeros") {
        document.getElementById("senhaInput").value = "";
        document.getElementById("senhaInput2").value = "";
        alert(erro);
    };
};

// CAPTCHA
function geraCaptcha() {
    // CONFIGURAÇÕES PARA GERAR CAPTCHA
    const canvasDiv = document.getElementById("captchaCanvas");
    const context = canvasDiv.getContext("2d");
    const captchaText = Math.random().toString(36).substring(7).toUpperCase();

    context.font = "30px Arial";
    context.fillStyle = "black";
    context.fillText(captchaText, 20, 50);

    return captchaText;
}

function verificaCaptcha() {
    // VERIFICA CAPTCHA GERADO COM CAPTCHA DIGITADO PELO USUARIO
    if(document.getElementById("captchaInput").value.toUpperCase() !== capV.toUpperCase()) {throw new Error("Captcha incorreto")};
};

let capV;

// VERIFICA LOGIN
function verificaLogin() {
    const login = localStorage.getItem("loginAutenticaTesteStaticVersion");

    if(login !== null) {loginEncontradoAutomaticamente()};
};

// BOTÃO CENTRAL [LOGIN, CADASTRAR-SE, ESQUECI_A_SENHA]
botaoCentral.onclick=async function() {
    // DADOS DIGITADOS PELO USUARIO
    const dadosForm = new FormData(form);
    const dadosLogin = {nome: dadosForm.get("nome"), email: dadosForm.get("email"), senha: dadosForm.get("senha"), senha2: dadosForm.get("senha2"), captcha: dadosForm.get("captcha")};

    // BOTÕES A SEREM PRECIONADOS PELO USUARIO E SUAS RESPECTIVAS AÇÕES
    if(botaoCentral.innerText === "Login") {chamaLogin(dadosLogin)};
    if(botaoCentral.innerText === "Cadastrar-se") {chamaCadastro(dadosLogin)};
    if(botaoCentral.innerText === "Trocar senha") {verificaDadostrocaSenha(dadosLogin)};
};

// BOTÃO ESQUERDO [ESQUECI_A_SENHA, VER_SENHA]
botaoEsquerdo.onclick=async function() {

    // BOTÕES A SEREM PRECIONADOS PELO USUARIO E SUAS RESPECTIVAS AÇÕES
    if(botaoEsquerdo.innerText === "Trocar senha" ? esqueciSenha() : visualizarSenha());
};

// BOTÃO DIREITO [CADASTRAR-SE, VOLTAR_AO_LOGIN]
botaoDireito.onclick=function() {

    // BOTÕES A SEREM PRECIONADOS PELO USUARIO E SUAS RESPECTIVAS AÇÕES
    if(botaoDireito.innerText==="Cadastrar-se") {painelCadastro()} else
    if(botaoDireito.innerText==="Voltar ao login") {painelLogin()};
};

// INCIALIZADORES
// verificaLogin();
