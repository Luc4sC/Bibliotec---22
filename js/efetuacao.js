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

function getLivro(isbn){
    buscaLivro = get("http://localhost:8080/livro/buscar/" + encodeURIComponent(isbn))

    livro = JSON.parse(buscaLivro)
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    livroRequisicao = getLivro(localStorage.getItem('isbn'))

    let usuario = document.getElementById("usuarioEfetuacao");
    let livro = document.getElementById("livro")
    let dataRequisicao = document.getElementById("dataRequisicao")

    usuario.textContent =  localStorage.getItem('rmRequisicao')
    usuario.value = localStorage.getItem('rmRequisicao')

    livro.textContent =  livroRequisicao.titulo + " " + livroRequisicao.subtitulo
    livro.value = livroRequisicao.isbn

    dataRequisicao.value = localStorage.getItem('dataRequisicao')
});

