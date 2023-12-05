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

function get(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getEmprestimos(){
    buscaEmprestimos = get(encodeURI(urlBibliotec) + "emprestimo/buscar")

    emprestimos = JSON.parse(buscaEmprestimos)

    let tabela = document.getElementById("tabela");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headUsuario = document.createElement("th");
    headLivro = document.createElement("th");
    headSituacao = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headUsuario.innerHTML = "Usuário";
    headLivro.innerHTML = "Livro";
    headSituacao.innerHTML = "Situação";

    headLinha.appendChild(headUsuario)
    headLinha.appendChild(headLivro)
    headLinha.appendChild(headSituacao)

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)

    emprestimos.forEach(emprestimo => {
        let linha = criarLinha(emprestimo);
        bodyTabela.appendChild(linha);
    });
}

function criarLinha(emprestimo){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    link = document.createElement("a");
    tdLink = document.createElement("td");
    tdUsuario = document.createElement("td");
    tdLivro = document.createElement("td");
    tdSituacao = document.createElement("td");

    //Definindo os valores dos elementos
    link.href = "efetuacao.html";
    link.text = "Ver";
    link.name = emprestimo.dataRequisicao
    link.id = emprestimo.usuario.ra
    link.className = emprestimo.livro.isbn
    link.addEventListener("click", function (event) {
        event.preventDefault();
    
        // Obtém os valores apropriados dos atributos do link
        let dataRequisicao = this.name;
        let rmRequisicao = this.id;
        let isbn = this.className;
    
        // Chama a função salvarRequisicao com os valores corretos
        salvarRequisicao(dataRequisicao, rmRequisicao, isbn);
    
        // Redireciona para a próxima página se necessário
        window.location.href = this.getAttribute("href");
    });

    // tdLink.appendChild(link);

    tdUsuario.innerHTML = emprestimo.usuario.userName
    tdLivro.innerHTML = emprestimo.livro.titulo + " " + emprestimo.livro.subtitulo
    tdSituacao.innerHTML = emprestimo.statusPedido
    tdLink.innerHTML
    tdLink.appendChild(link)

    //Inserindo elementos na Tabela
    linha.appendChild(tdUsuario)
    linha.appendChild(tdLivro)
    linha.appendChild(tdSituacao)
    linha.appendChild(tdLink)

    return linha;
}

function salvarRequisicao(dataRequisicao, rmRequisicao, isbn) {
    sessionStorage.setItem("dataRequisicao", dataRequisicao);
    sessionStorage.setItem("rmRequisicao", rmRequisicao);
    sessionStorage.setItem("isbn", isbn);
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    getEmprestimos();
});

var usuarioLogado = sessionStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'index.html';
}