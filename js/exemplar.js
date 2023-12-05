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

function getExemplares(){
    buscaExemplares = get(encodeURI(urlBibliotec) + encodeURI("exemplar/buscar"))
 
    //Transforma JSON para JS
    exemplares = JSON.parse(buscaExemplares);
 
    let tabela = document.getElementById("tabela");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headVazio = document.createElement("th");
    headTitulo = document.createElement("th");
    headSubtitulo = document.createElement("th");
    headISBN = document.createElement("th");
    headNumeracao = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headVazio.id = "vazio2";

    headVazio.innerHTML = "";
    headTitulo.innerHTML = "Título";
    headSubtitulo.innerHTML = "Subtitulo";
    headISBN.innerHTML = "ISBN";
    headNumeracao.innerHTML = "Nº";

    headLinha.appendChild(headVazio)
    headLinha.appendChild(headTitulo)
    headLinha.appendChild(headSubtitulo)
    headLinha.appendChild(headISBN)
    headLinha.appendChild(headNumeracao)

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)
    
    exemplares.forEach(exemplar => {
        let linha = criarLinha(exemplar);
        bodyTabela.appendChild(linha);
    });
}

function criarLinha(exemplar){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    botao = document.createElement("button");
    icon = document.createElement("ion-icon");
    tdBotao = document.createElement("td");
    tdTitulo = document.createElement("td");
    tdSubtitulo = document.createElement("td");
    tdISBN = document.createElement("td");
    tdNumeracao = document.createElement("td");
    
    //Definindo os valores dos elementos
    icon.name = "trash-outline";
    botao.type = 'submit';
    botao.className = 'delete';
    botao.appendChild(icon);
    botao.id = exemplar.isbn;
    botao.value = exemplar.numeracao
    botao.onclick =function() {
        deleteExemplar(this.id, this.value);
    };
    // "clickTeclado(this.value);"

    tdBotao.appendChild(botao);
    tdBotao.scope = "row";

    tdBotao.innerHTML;
    tdTitulo.innerHTML = exemplar.titulo
    tdSubtitulo.innerHTML = exemplar.subtitulo
    tdISBN.innerHTML = exemplar.isbn
    tdNumeracao.innerHTML = exemplar.numeracao

    //Inserindo elementos na Tabela
    linha.appendChild(tdBotao)
    linha.appendChild(tdTitulo)
    linha.appendChild(tdSubtitulo)
    linha.appendChild(tdISBN)
    linha.appendChild(tdNumeracao)

    return linha;
}

function limparTabela() {
    let tabela = document.getElementById("tabela");
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function criarBodyExemplar(){
    event.preventDefault()
    rm = sessionStorage.getItem("rm")

    let url = encodeURI(urlBibliotec) + encodeURI("exemplar/adicionar/") + encodeURI(rm)

    let isbn = document.getElementById("livro").value;
    let numeracao = document.getElementById("numeracaoExemplar").value

    console.log(isbn)
    console.log(numeracao)

    body = {"isbn" : isbn, "numeracao":numeracao}

    postExemplar(url, body)
}

function postExemplar(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        // console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getExemplares();
    }

    return this.responseText
}

function deleteExemplar(isbn, numeracao){
    rm = sessionStorage.getItem("rm")

    let url = encodeURI(urlBibliotec) + encodeURI("exemplar/deletar/") + encodeURIComponent(isbn) + "/" + encodeURIComponent(numeracao) +  "/" + encodeURI(rm)

    let request = new XMLHttpRequest()
    request.open("DELETE", url)
    request.send()

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getExemplares();
    }

    return this.responseText
}


//Cria seletores Livros
function getLivros(){
    buscaLivros = get(encodeURI(urlBibliotec) + encodeURI("livro/buscar"))
 
    //Transforma JSON para JS
    livros = JSON.parse(buscaLivros);
 
    let seletor = document.getElementById("livro");

    livros.forEach(livro => {
        let opcao = criarOpcaoLivro(livro);
        seletor.add(opcao);
    });
 
    console.log(livros)
}

function criarOpcaoLivro(livro){
    novaOpcao = document.createElement("option")
    novaOpcao.value = livro.isbn
    novaOpcao.text = livro.titulo + " " + livro.subtitulo
  
    return novaOpcao
}

//Chama Funções ao carregar a Página
document.addEventListener("DOMContentLoaded", function() {
    getExemplares();
    getLivros();
});

var usuarioLogado = sessionStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'index.html';
}