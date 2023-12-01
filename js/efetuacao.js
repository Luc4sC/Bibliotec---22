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
    let item = document.getElementById("exemplares").value;
    let dataRequisicao = document.getElementById("dataRequisicao").value;

    console.log(rm)
    console.log(isbn)
    console.log(item)
    console.log(dataRequisicao)

    body = {"rm" : rm, "isbn": isbn, "item": item, "dataRequisicao": dataRequisicao}

    putEfetuacao(url, body)
}

function putEfetuacao(url, body) {
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(JSON.stringify(data));
    })
}

function criarBodyFinalizacao(){
    event.preventDefault()

    let url = "http://localhost:8080/emprestimo/finalizar"

    let rm = document.getElementById("usuarioEfetuacao").value;
    let isbn = document.getElementById("livro").value;
    let observacao = document.getElementById("observacao").value;
    let dataRequisicao = document.getElementById("dataRequisicao").value;

    console.log(rm)
    console.log(isbn)
    console.log(observacao)
    console.log(dataRequisicao)

    body = {"rm" : rm, "isbn": isbn, "observacao": observacao, "dataRequisicao": dataRequisicao}

    putFinalizacao(url, body)
}

function putFinalizacao(url, body){
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(JSON.stringify(data));
    })
}

function criarBodyRecusa(){
    event.preventDefault()

    let url = "http://localhost:8080/emprestimo/recusar"

    let rm = document.getElementById("usuarioEfetuacao").value;
    let isbn = document.getElementById("livro").value;
    let observacao = document.getElementById("observacao").value;
    let dataRequisicao = document.getElementById("dataRequisicao").value;

    console.log(rm)
    console.log(isbn)
    console.log(observacao)
    console.log(dataRequisicao)

    body = {"rm" : rm, "isbn": isbn, "observacao": observacao, "dataRequisicao": dataRequisicao}

    deleteEmprestimo(url, body)
}

function deleteEmprestimo(url, body) {
  fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      alert(data);
  })
  .catch(error => {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição. Consulte o console para mais detalhes.');
  });
}

function getExemplares(isbn){
    buscaExemplares = get("http://localhost:8080/exemplar/buscar/" + encodeURIComponent(isbn))

    exemplares = JSON.parse(buscaExemplares)
    
    return exemplares
}

function getLivro(isbn){
    buscaLivro = get("http://localhost:8080/livro/buscar/" + encodeURIComponent(isbn))

    livro = JSON.parse(buscaLivro)

    return livro
}

function getUser(rm){
    buscaUser = get("http://localhost:4500/api/users/user/" + encodeURIComponent(rm))

    user = JSON.parse(buscaUser)

    return user
}

function criaOpcaoExemplar(exemplar){
    console.log(exemplar)
  
    novaOpcao = document.createElement("option")
    novaOpcao.value = exemplar.numeracao 
    novaOpcao.text = exemplar.numeracao
  
    return novaOpcao
}

function criaOpcaoLivro(livro){
    console.log(livro)
  
    novaOpcao = document.createElement("option")
    novaOpcao.value = livro.isbn 
    novaOpcao.text = livro.titulo + " " + livro.subtitulo
  
    return novaOpcao
}

function criaOpcaoUser(user){
    console.log(user)
  
    novaOpcao = document.createElement("option")
    novaOpcao.value = user.ra
    novaOpcao.text = user.userName  
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

    let isbn = localStorage.getItem("isbn")
    let rmRequisicao = localStorage.getItem("rmRequisicao")

    console.log(isbn)
    console.log(rmRequisicao)

    livro = getLivro(isbn)
    user = getUser(rmRequisicao)
    exemplares = getExemplares(isbn)

    let seletorLivro = document.getElementById("livro")
    let seletorUsuario = document.getElementById("usuarioEfetuacao")
    let dataRequisicao = document.getElementById("dataRequisicao")
    let seletorExemplares = document.getElementById("exemplares")

    opcaoLivro = criaOpcaoLivro(livro)
    opcaoUser = criaOpcaoUser(user)
    exemplares.forEach(exemplar => {
        let opcao = criaOpcaoExemplar(exemplar);
        seletorExemplares.appendChild(opcao)
        });

    seletorUsuario.appendChild(opcaoUser)
    seletorLivro.appendChild(opcaoLivro)

    dataRequisicao.value = localStorage.getItem('dataRequisicao')
});

