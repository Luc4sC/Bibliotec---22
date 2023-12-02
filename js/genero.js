function get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getGeneros(){
    buscaGeneros = get("http://localhost:8080/genero/buscar")
 
    //Transforma JSON para JS
    generos = JSON.parse(buscaGeneros);
 
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
    
    generos.forEach(genero => {
     let linha = criarLinha(genero);
     bodyTabela.appendChild(linha);
     });
 
    console.log(generos)
}

function criarLinha(genero){
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
    botao.id = genero.nome;
    botao.onclick =function() {
        deleteGenero(this.id);
    };

    tdBotao.appendChild(botao);
    tdBotao.scope = "row";

    tdBotao.innerHTML;
    tdNome.innerHTML = genero.nome

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

function criarBodyGenero(){
    event.preventDefault()
    rm = localStorage.getItem("rm")
    let url = "http://localhost:8080/genero/cadastrar/" + encodeURI(rm)

    let nome = document.getElementById("nomeGenero").value;

    console.log(nome)

    body = {"nomeGenero" : nome}

    postGenero(url, body)
}

function postGenero(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getGeneros();
    }

    return this.responseText
}

function deleteGenero(nomeGenero){
    rm = localStorage.getItem("rm")
    let url = "http://localhost:8080/genero/deletar/" + encodeURIComponent(nomeGenero) + "/" + encodeURI(rm)

    let request = new XMLHttpRequest()
    request.open("DELETE", url)
    request.send()

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getGeneros();
    }

    return this.responseText
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    getGeneros();
  });