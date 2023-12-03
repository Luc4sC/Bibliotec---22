let UrlAPIBibliotecLocal = "http://localhost:8080/"
let UrlAPIUsersLocal = "http://localhost:4500/api/users/"
let urlTesteAPIBibliotec = "https://tcc-22-teste-api.up.railway.app/"
let urlAPIUsers = "https://bibliotecusers-production.up.railway.app/api/users/" 

function imagemBase64(input, callback) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
  
    reader.onload = function (e) {
      if (e.target && e.target.result) {
        var base64Image = e.target.result;
        base64Image.trim();
        base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
  
        // Chame a função de callback com a imagem codificada em Base64
        callback(base64Image);
      } 
      else {
        console.error('Resultado da leitura indefinido ou nulo.');
      }
    };
  
    reader.readAsDataURL(input.files[0]);
    } 
    
    else {
      console.error('Nenhum arquivo selecionado.');
    }
}
  
function criarBodyLivro(){
  event.preventDefault()
  rm = localStorage.getItem("rm")
  console.log(rm)
  let imagemForm = document.getElementById("imgLivro");
  
  imagemBase64(imagemForm, function (imagem) {
    
    // let url = "http://localhost:8080/livro/cadastrar/" + encodeURI(rm)
    let url = "tcc-22-teste-api.up.railway.app/livro/cadastrar/" + encodeURI(rm)
  
    let titulo = document.getElementById("tituloLivro").value;
    let subtitulo = document.getElementById("subtituloLivro").value;
    let categoria = document.getElementById("categoriaLivro").value;
    let genero = document.getElementById("generoLivro").value;
    let isbn = document.getElementById("isbnLivro").value;
    let numeroPaginas = document.getElementById("paginasLivro").value;
    let autor = document.getElementById("autorLivro").value;
    let data = document.getElementById("dataLivro").value;
    let editora = document.getElementById("editoraLivro").value;
    let sinopse = document.getElementById("sinopseLivro").value;
    let idioma = document.getElementById("idiomaLivro").value;
      
    body = {"titulo": titulo, 
            "subtitulo": subtitulo, 
            "categoria": categoria,
            "genero": genero,
            "editora" : editora,
            "isbn": isbn,
            "numeroPaginas": numeroPaginas,
            "autor":autor,
            "idioma": idioma,
            "sinopse": sinopse,
            "imagemBase64": imagem,
            "data": data
          }
      
          postLivro(url, body)
      });
}
  
function postLivro(url, livro){
  let request = new XMLHttpRequest()
  request.open("POST", url, true)
  request.setRequestHeader("Content-Type", "application/json")
  request.send(JSON.stringify(livro))
  
  request.onload = function(){
    console.log(this.responseText)
    alert(this.responseText)
    limparTabela();
    getLivros()
  }
  
  return this.responseText
}
  

function get(url) {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
      
  return request.response
}
  
function getAutores(){
  // buscaAutores = get("http://localhost:8080/autor/buscar")
  buscaAutores = get("tcc-22-teste-api.up.railway.app/autor/buscar")
  
  //Transforma JSON para JS
  autores = JSON.parse(buscaAutores);
  
  let seletor = document.getElementById("autorLivro");
  
  autores.forEach(autor => {
    let opcao = criaOpcaoAutor(autor);
    seletor.add(opcao)
  });
}
  
function getGeneros(){
  
  // buscaGeneros = get("http://localhost:8080/genero/buscar")
  buscaGeneros = get("tcc-22-teste-api.up.railway.app/genero/buscar")
  
  //Transforma JSON para JS
  generos = JSON.parse(buscaGeneros);
  
  let seletor = document.getElementById("generoLivro");
  
  generos.forEach(genero => {
    let opcao = criaOpcaoGenero(genero);
    seletor.add(opcao)
  });
}
  
function getCategorias(){
  
  // buscaCategorias = get("http://localhost:8080/categoria/buscar")
  buscaCategorias = get("tcc-22-teste-api.up.railway.app/categoria/buscar")

  //Transforma JSON para JS
  categorias = JSON.parse(buscaCategorias);
  
  let seletor = document.getElementById("categoriaLivro");
  
  categorias.forEach(element => {
    let opcao = criaOpcaoCategoria(element);
    seletor.add(opcao)
  });
}
  
function getEditoras(){
  
  // buscaEditoras = get("http://localhost:8080/editora/buscar")
  buscaEditoras = get("tcc-22-teste-api.up.railway.app/editora/buscar")

  //Transforma JSON para JS
  editoras = JSON.parse(buscaEditoras);
  
  let seletor = document.getElementById("editoraLivro");
  
  editoras.forEach(element => {
    let opcao = criaOpcaoEditora(element);
    seletor.add(opcao)
  });
}
  
function criaOpcaoAutor(autor){
  novaOpcao = document.createElement("option")
  novaOpcao.value = autor.nomeArtistico
  novaOpcao.text = autor.nomeArtistico
  
  return novaOpcao
}
  
function criaOpcaoGenero(genero){
  novaOpcao = document.createElement("option")
  novaOpcao.value = genero.nome
  novaOpcao.text = genero.nome
  
  return novaOpcao
}
  
function criaOpcaoCategoria(categoria){
  novaOpcao = document.createElement("option")
  novaOpcao.value = categoria.nome
  novaOpcao.text = categoria.nome
  
  return novaOpcao
}
  
function criaOpcaoEditora(editora){
  novaOpcao = document.createElement("option")
  novaOpcao.value = editora.nomeFantasia
  novaOpcao.text = editora.nomeFantasia
  
  return novaOpcao
}
  
//Definir tabela Livros
function limparTabela() {
    let tabela = document.getElementById("tabela");
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function getLivros(){
  buscaLivros = get("http://localhost:8080/livro/buscar")
 
  //Transforma JSON para JS
  livros = JSON.parse(buscaLivros);
 
  let tabela = document.getElementById("tabela");

  headTabela = document.createElement("thead");
  headLinha = document.createElement("tr");
  headVazio = document.createElement("th");
  headTitulo = document.createElement("th");
  headSubtitulo = document.createElement("th");
  headISBN = document.createElement("th");
  bodyTabela = document.createElement("tbody")

  headVazio.id = "vazio3";

  headVazio.innerHTML = "";
  headTitulo.innerHTML = "Título";
  headSubtitulo.innerHTML = "Subtitulo";
  headISBN.innerHTML = "ISBN";

  headLinha.appendChild(headVazio)
  headLinha.appendChild(headTitulo)
  headLinha.appendChild(headSubtitulo)
  headLinha.appendChild(headISBN)

  headTabela.appendChild(headLinha)
  tabela.appendChild(headTabela)
  tabela.appendChild(bodyTabela)
    
  livros.forEach(livro => {
    let linha = criarLinha(livro);
    bodyTabela.appendChild(linha);
  });
}

function criarLinha(livro){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    botao = document.createElement("button");
    icon = document.createElement("ion-icon");
    tdBotao = document.createElement("td");
    tdTitulo = document.createElement("td");
    tdSubtitulo = document.createElement("td");
    tdISBN = document.createElement("td");
    
    //Definindo os valores dos elementos
    icon.name = "trash-outline";
    botao.type = 'submit';
    botao.className = 'delete';
    botao.appendChild(icon);
    botao.id = livro.isbn;
    botao.onclick =function() {
        deleteLivro(this.id);
    };
    // "clickTeclado(this.value);"

    tdBotao.appendChild(botao);
    tdBotao.scope = "row";

    tdBotao.innerHTML;
    tdTitulo.innerHTML = livro.titulo
    tdSubtitulo.innerHTML = livro.subtitulo
    tdISBN.innerHTML = livro.isbn

    //Inserindo elementos na Tabela
    linha.appendChild(tdBotao)
    linha.appendChild(tdTitulo)
    linha.appendChild(tdSubtitulo)
    linha.appendChild(tdISBN)

    return linha;
}

function deleteLivro(isbn){
  rm = localStorage.getItem("rm")
  
  // let url = "http://localhost:8080/livro/deletar/" + encodeURI(rm)
  let url = "tcc-22-teste-api.up.railway.app/livro/deletar/" + encodeURI(rm)

  let request = new XMLHttpRequest()
  request.open("DELETE", url + encodeURIComponent(isbn))
  request.send()

  request.onload = function(){
    console.log(this.responseText)
    alert(this.responseText)
    limparTabela();
    getLivros();
  }

    return this.responseText
}


document.addEventListener("DOMContentLoaded", function() {
  getAutores();
  getGeneros();
  getCategorias();
  getEditoras();
  getLivros();
  rm = localStorage.getItem("rm")
  console.log(rm)
});