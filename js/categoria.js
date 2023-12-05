//APIs Locais
//APIs Locais
let UrlAPIBibliotecLocal = "http://localhost:8080/"
let UrlAPIUsersLocal = "http://localhost:4500/api/users/"


//APIs Testes
let urlTesteAPIBibliotec = "https://tcc-22-teste-api.up.railway.app/"
let urlTesteAPIUsers = "https://bibliotecusers-testeapi.up.railway.app/api/users/"

//APIs definitivas
let urlAPIBibliotec = "https://tcc-22-production.up.railway.app/"
let urlAPIUsers = "https://bibliotecusers-production.up.railway.app/api/users/" 

//URLs
let urlBibliotec = urlAPIBibliotec
let urlUsers = urlAPIUsers

function get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getCategorias(){
    buscaCategorias = get(encodeURI(urlBibliotec) + encodeURI("categoria/buscar"))
    
    //Transforma JSON para JS
    categorias = JSON.parse(buscaCategorias);
 
    let tabela = document.getElementById("tabela");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headVazio = document.createElement("th");
    headNome = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headVazio.id = "vazio";

    headVazio.innerHTML = "";
    headNome.innerHTML = "Nome";

    headLinha.appendChild(headVazio)
    headLinha.appendChild(headNome)

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)
    
    categorias.forEach(categoria => {
     let linha = criarLinha(categoria);
     bodyTabela.appendChild(linha);
    });
}

function criarLinha(categoria){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    botao = document.createElement("button");
    icon = document.createElement("ion-icon");
    tdBotao = document.createElement("td");
    tdNome = document.createElement("td");
    
    //Definindo os valores dos elementos
    icon.name = "trash-outline";
    botao.type = 'submit';
    botao.className = 'delete';
    botao.appendChild(icon);
    botao.id = categoria.nome;
    botao.onclick =function() {
        deleteCategoria(this.id);
    };
    // "clickTeclado(this.value);"
    tdBotao.appendChild(botao);
    tdBotao.scope = "row";

    tdBotao.innerHTML;
    tdNome.innerHTML = categoria.nome

    //Inserindo elementos na Tabela
    linha.appendChild(tdBotao)
    linha.appendChild(tdNome)

    return linha;
}

function limparTabela() {
    let tabela = document.getElementById("tabela");
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function criarBodyCategoria(){
    event.preventDefault()

    rm = sessionStorage.getItem("rm")
    
    let url = encodeURI(urlBibliotec) + encodeURI("categoria/cadastrar/") + encodeURI(rm)
    
    let nome = document.getElementById("nomeCategoria").value;

    // console.log(nome)

    body = {"nomeCategoria" : nome}

    postCategoria(url, body)
}

function postCategoria(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        // console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getCategorias();
    }

    return this.responseText
}

function deleteCategoria(nomeCategoria){
    rm = sessionStorage.getItem("rm")

    let url = encodeURI(urlBibliotec) + encodeURI("categoria/deletar/") + encodeURIComponent(nomeCategoria) + "/" + encodeURI(rm)

    let request = new XMLHttpRequest()
    request.open("DELETE", url)
    request.send()

    request.onload = function(){
        // console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getCategorias();
    }

    return this.responseText
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    getCategorias();
});

var usuarioLogado = sessionStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'index.html';
}