function get(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getEmprestimos(){
    buscaEmprestimos = get("http://localhost:8080/emprestimo/buscar")

    emprestimos = JSON.parse(buscaEmprestimos)

    let tabela = document.getElementById("tabela");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headUsuario = document.createElement("th");
    headLivro = document.createElement("th");
    headSituacao = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headUsuario.innerHTML = "Usuário";
    headULivro.innerHTML = "Livro";
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
    
       console.log(emprestimos)
}

function criarLinha(emprestimo){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    link = document.createElement("a");
    icon = document.createElement("ion-icon");
    tdLink = document.createElement("td");
    tdUsuario = document.createElement("td");
    tdLivro = document.createElement("td");
    tdSituacao = document.createElement("td");

    //Definindo os valores dos elementos
    link.href = "efetuaco.html";
    link.value = emprestimo.dataRequisicao
    link.id = emprestimo.usuario.ra
    link.className = emprestimo.livro.isbn
    link.onclick =function() {
        salvarRequisicao(this.value, this.id, this.className);
    };

    tdLink.appendChild(link);

    tdUsuario.innerHTML = emprestimo.usuario.userName
    tdLivro.innerHTML = emprestimo.livro.titulo + " " + emprestimo.livro.subtitulo
    tdSituacao.innerHTML = emprestimo.status
    tdLink.innerHTML = "Ver" 

    //Inserindo elementos na Tabela
    linha.appendChild(tdUsuario)
    linha.appendChild(tdLivro)
    linha.appendChild(tdSituacao)
    linha.appendChild(tdLink)

    return linha;
}

function salvarRequisicao(dataRequisicao, rmRequisicao, isbn){

    //Salva informações para próxima página
    let a = document.getElementById(rmRequisicao);

    a.addEventListener("click", function () {
        localStorage.setItem("dataRequisicao", dataRequisicao);
        localStorage.setItem("rmRequisicao", rmRequisicao);
        localStorage.setItem("isbn", isbn);
    })
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    getEmprestimos();
});