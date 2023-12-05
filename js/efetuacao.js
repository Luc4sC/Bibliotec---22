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

function criarBodyEfetuacao(){
  event.preventDefault()
  rmBibliotecario = sessionStorage.getItem("rm")

  let url = encodeURI(urlBibliotec) + encodeURI("emprestimo/efetuar/") + encodeURI(rmBibliotecario)

  let rm = document.getElementById("usuarioEfetuacao").value;
  let isbn = document.getElementById("livro").value;
  let item = document.getElementById("exemplares").value;
  let dataRequisicao = document.getElementById("dataRequisicao").value;

  // console.log(rm)
  // console.log(isbn)
  // console.log(item)
  // console.log(dataRequisicao)

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
  rmBibliotecario = sessionStorage.getItem("rm")

  let url = encodeURI(urlBibliotec) + encodeURI("emprestimo/finalizar/") + encodeURI(rmBibliotecario)

  let rm = document.getElementById("usuarioEfetuacao").value;
  let isbn = document.getElementById("livro").value;
  let observacao = document.getElementById("observacao").value;
  let dataRequisicao = document.getElementById("dataRequisicao").value;

  // console.log(rm)
  // console.log(isbn)
  // console.log(observacao)
  // console.log(dataRequisicao)

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
    rmBibliotecario = sessionStorage.getItem("rm")
    
    let url = encodeURI(urlBibliotec) + encodeURI("emprestimo/recusar/") + encodeURI(rmBibliotecario)

    let rm = document.getElementById("usuarioEfetuacao").value;
    let isbn = document.getElementById("livro").value;
    let observacao = document.getElementById("observacao").value;
    let dataRequisicao = document.getElementById("dataRequisicao").value;

    // console.log(rm)
    // console.log(isbn)
    // console.log(observacao)
    // console.log(dataRequisicao)

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
  
  buscaExemplares = get(encodeURI(urlBibliotec) + encodeURI("exemplar/buscar/") + encodeURIComponent(isbn))

  exemplares = JSON.parse(buscaExemplares)
    
  return exemplares
}

function getLivro(isbn){
  buscaLivro = get(encodeURI(urlBibliotec) + encodeURI("livro/buscar/") + encodeURIComponent(isbn))

  livro = JSON.parse(buscaLivro)

  return livro
}

function getUser(rm){
  buscaUser = get(encodeURI(urlUsers) + encodeURI("user/") + encodeURIComponent(rm))

  user = JSON.parse(buscaUser)

  return user
}

function criaOpcaoExemplar(exemplar){
  novaOpcao = document.createElement("option")
  novaOpcao.value = exemplar.numeracao 
  novaOpcao.text = exemplar.numeracao
  
  return novaOpcao
}

function criaOpcaoLivro(livro){
  novaOpcao = document.createElement("option")
  novaOpcao.value = livro.isbn 
  novaOpcao.text = livro.titulo + " " + livro.subtitulo
  
  return novaOpcao
}

function criaOpcaoUser(user){
  novaOpcao = document.createElement("option")
  novaOpcao.value = user.ra
  novaOpcao.text = user.userName  
  return novaOpcao
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {

  let isbn = sessionStorage.getItem("isbn")
  let rmRequisicao = sessionStorage.getItem("rmRequisicao")

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

  dataRequisicao.value = sessionStorage.getItem('dataRequisicao')
});

var usuarioLogado = sessionStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'index.html';
}
