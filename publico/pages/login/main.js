// BOTÕES
const buttonSair = document.getElementById("buttonSair");

// FUNCTIONS

// VERIFICA LOGIN
function verificaLogin() {
    const cadastros = localStorage.getItem("loginAutenticaTesteStaticVersion").split(",");
    const nomeUsuario = new URLSearchParams(window.location.search).get("nome");

    if(cadastros !== null ? encontraCadastros(cadastros, nomeUsuario) : tokenInvalido());
};

function encontraCadastros(cadastros, nomeUsuario) {
    console.log(`Usuario a ser encontrado: ${nomeUsuario}`);
    let cadastroEncontrado;

    for(let i = 0; i < cadastros.length; i++) {
        console.log(`Usuario verificado: ${cadastros[i].split("/")[0]}`);

        if(nomeUsuario === cadastros[i].split("/")[0] ? cadastroEncontrado = true : cadastroEncontrado = false);
    };

    if(cadastroEncontrado === true ? tokenValido(nomeUsuario) : tokenInvalido());
};

function tokenInvalido() {
    alert("Você precisa realizar seu login!");
    window.location.href="../home/index.html";
};

function tokenValido(nome) {
    document.getElementById("h1Login").innerText="Login aprovado";

    document.querySelector("main").innerHTML=`
    <h1>Login efetuado com sucesso!</h1>
    <h1>Bem-vindo(a) ${nome}</h1>
    `

    document.getElementById("nomeUsuario").innerText=nome;
};

// BUTTON OPCÕES
buttonSair.onclick=function() {
    document.querySelector("main").innerHTML=`
    <h1>Saindo</h1>
    <h1>Aguarde alguns segundos</h1>
    `;

    setTimeout(() => {
        window.location="../home/index.html";
    }, 4000);
};

// INICIALIZALIZADORES
verificaLogin();
