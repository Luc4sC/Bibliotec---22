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

function getAutores(){
    buscaAutores = get(encodeURI(urlBibliotec) + encodeURI("autor/buscar"))
 
    //Transforma JSON para JS
    autores = JSON.parse(buscaAutores);
 
    let tabela = document.getElementById("tabela");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headVazio = document.createElement("th");
    headNome = document.createElement("th");
    headNomeArtistico = document.createElement("th");
    headDataNascimento = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headVazio.id = "vazio2";


    headVazio.innerHTML = "";
    headNome.innerHTML = "Nome";
    headNomeArtistico.innerHTML = "Nome Artistíco";
    headDataNascimento.innerHTML = "Data Nascimento";

    headLinha.appendChild(headVazio)
    headLinha.appendChild(headNome)
    headLinha.appendChild(headNomeArtistico)
    headLinha.appendChild(headDataNascimento)

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)
    
    autores.forEach(autor => {
     let linha = criarLinha(autor);
     bodyTabela.appendChild(linha);
    });
}

function criarLinha(autor){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    botao = document.createElement("button");
    icon = document.createElement("ion-icon");
    tdBotao = document.createElement("td");
    tdNome = document.createElement("td");
    tdNomeArtistico = document.createElement("td");
    tdDataNascimento = document.createElement("td");
    
    //Definindo os valores dos elementos
    icon.name = "trash-outline";
    botao.type = 'submit';
    botao.className = 'delete';
    botao.appendChild(icon);
    botao.id = autor.nomeArtistico;
    botao.onclick =function() {
        deleteAutor(this.id);
    };
    // "clickTeclado(this.value);"

    tdBotao.appendChild(botao);
    tdBotao.scope = "row";

    tdBotao.innerHTML;
    tdNome.innerHTML = autor.nome
    tdNomeArtistico.innerHTML = autor.nomeArtistico
    tdDataNascimento.innerHTML = autor.dataNascimento

    //Inserindo elementos na Tabela
    linha.appendChild(tdBotao)
    linha.appendChild(tdNome)
    linha.appendChild(tdNomeArtistico)
    linha.appendChild(tdDataNascimento)

    return linha;
}

function limparTabela() {
    let tabela = document.getElementById("tabela");
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function criarBodyAutor(){
    event.preventDefault()
    rm = sessionStorage.getItem("rm")

    let url = encodeURI(urlBibliotec) + encodeURI("autor/cadastrar/") + encodeURI(rm)

    let nome = document.getElementById("nomeAutor").value;
    let nomeArtistico = document.getElementById("nomeArtisticoAutor").value;
    let dataNascimento = document.getElementById("dataNascAutor").value;

    // console.log(nome)
    // console.log(nomeArtistico)
    // console.log(dataNascimento)

    body = {"nomeAutor" : nome,
    "nomeArtistico" : nomeArtistico,
    "dataNascimento" : dataNascimento
    }

    postAutor(url, body)
}

function postAutor(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        // console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getAutores();
    }

    return this.responseText
}

function deleteAutor(nomeArtistico){
    rm = sessionStorage.getItem("rm")

    let url = encodeURI(urlBibliotec) + encodeURI("autor/deletar/") + encodeURIComponent(nomeArtistico) + "/" + encodeURI(rm)

    let request = new XMLHttpRequest()
    request.open("DELETE", url)
    request.send()

    request.onload = function(){
        // console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getAutores();
    }

    return this.responseText
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    getAutores();
});

var usuarioLogado = sessionStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'index.html';
}