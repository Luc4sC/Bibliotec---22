function get(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function criarBodyEfetuacao(){
    event.preventDefault()

    let url = "http://localhost:8080/emprestimo/efetuar"

    let rm = document.getElementById("usuarioEfetuacao").value;
    let isbn = document.getElementById("livro").value;
    let item = document.getElementById("numExemplar").value;
    let dataRequisicao = document.getElementById("dataRequisicao").value;

    console.log(rm)
    console.log(isbn)
    console.log(item)
    console.log(dataRequisicao)

    body = {"rm" : rm, "isbn": isbn, "item": item, "dataRequisicao": dataRequisicao}

    putEfetuacao(url, body)
}

function putEfetuacao(url, body){
    let request = new XMLHttpRequest()
    request.open("PUT", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)
    }

    return this.responseText
}

function getExemplares(isbn){
    buscaExemplares = get("http://localhost:8080/exemplar/buscar/" + encodeURIComponent(isbn))

    exemplares = JSON.parse(buscaExemplares)


}

function getLivro(isbn){
    buscaLivro = get("http://localhost:8080/livro/buscar/" + encodeURIComponent(isbn))

    livro = JSON.parse(buscaLivro)
}

function getUser(rm){
    buscaUser = get("http://localhost:8080/livro/buscar/" + encodeURIComponent(rm))

    user = JSON.parse(buscaUser)
}



function criaOpcaoLivro(livro){
    console.log(livro)
  
    novaOpcao = document.createElement("option")
    novaOpcao.value = livro.titulo + " " + livro.subtitulo
    novaOpcao.text = livro.isbn
  
    return novaOpcao
}

function criaOpcaoUser(user){
    console.log(user)
  
    novaOpcao = document.createElement("option")
    novaOpcao.value = user.userName
    novaOpcao.text = user.ra
  
    return novaOpcao
}

function getEditoras(){
    buscaEditoras = get("http://localhost:8080/editora/buscar")
  
    //Transforma JSON para JS
    editoras = JSON.parse(buscaEditoras);
  
    let seletor = document.getElementById("editoraLivro");
  
    editoras.forEach(element => {
     let opcao = criaOpcaoEditora(element);
     seletor.add(opcao)
     });
  
    console.log(editoras)
  }

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    livroRequisicao = getLivro(localStorage.getItem('isbn'))
    usuarioRequisicao = getUser(localStorage.getItem('rmRequisicao'))

    let seletorLivro = document.getElementById("livro")
    let seletorUser = document.getElementById("usuarioEfetuacao")
    let dataRequisicao = document.getElementById("dataRequisicao")

    opcaoLivro = criaOpcaoLivro(livroRequisicao)
    opcaoUser = criaOpcaoLivro(usuarioRequisicao)
    seletorLivro.add(opcaoLivro)
    seletorUser.add(opcaoUser)

    dataRequisicao.value = localStorage.getItem('dataRequisicao')
});

