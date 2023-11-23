function criarRequisicaoLivro(){

    event.preventDefault()

    let url = "http://localhost:8080/livro/cadastrar"

    let titulo = document.getElementById("tituloLivro").value;
    let subtitulo = document.getElementById("subtituloLivro").value;
    let categoria = document.getElementById("categoriaLivro").value;
    let genero = document.getElementById("generoLivro");
    let isbn = document.getElementById("isbnLivro").value;
    let numeroPaginas = document.getElementById("paginasLivro").value;
    let autor = document.getElementById("autorLivro");
    let data = document.getElementById("dataLivro").value;
    let imagem = document.getElementById("imagemLivro").files[0];

    console.log(titulo)
    console.log(subtitulo)
    console.log(isbn)
    console.log(numeroPaginas)
    console.log(data)

    body = {"titulo": titulo, 
    "subtitulo": subtitulo, 
    "categoria": categoria,
    "genero": genero,
    "isbn": isbn,
    "numeroPaginas": numeroPaginas,
    "autor":autor,
    "data": data
    }

    let livro = JSON.stringify(body)

    cadastrarLivro(url, livro, imagem)
}

function cadastrarLivro(url, livro, imagem){
    let requisicao = new FormData()

    requisicao.append("arquivo", imagem)
    requisicao.append("dadosLivro",livro )

  //   return $.ajax({
  //     url: url,
  //     type: "POST",
  //     processData: false,
  //     contentType: false,
  //     data: requisicao,
  //     success: function(data) {
  //         console.log(data);
  //     },
  //     error: function(error) {
  //         console.error(error);
  //     }
  // });

    return fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
      },
        body: requisicao,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    
    // return this.responseText
}

//Definir os valores dos Selects
function get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getAutores(){
   buscaAutores = get("http://localhost:8080/autor/buscar")

   //Transforma JSON para JS
   autores = JSON.parse(buscaAutores);

   let seletor = document.getElementById("autorLivro");

   autores.forEach(element => {
    let opcao = criaOpcaoAutor(element);
    seletor.add(opcao)
    });

   console.log(autores)
}

function getGeneros(){
  buscaGeneros = get("http://localhost:8080/genero/buscar")

  //Transforma JSON para JS
  generos = JSON.parse(buscaGeneros);

  let seletor = document.getElementById("generoLivro");

  generos.forEach(element => {
   let opcao = criaOpcaoGenero(element);
   seletor.add(opcao)
   });

  console.log(autores)
}

function getCategorias(){
  buscaCategorias = get("http://localhost:8080/categoria/buscar")

  //Transforma JSON para JS
  categorias = JSON.parse(buscaCategorias);

  let seletor = document.getElementById("categoriaLivro");

  categorias.forEach(element => {
   let opcao = criaOpcaoCategoria(element);
   seletor.add(opcao)
   });

  console.log(categorias)
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

function criaOpcaoAutor(autor){
  console.log(autor)

  novaOpcao = document.createElement("option")
  novaOpcao.value = autor
  novaOpcao.text = autor.nomeArtistico

  return novaOpcao
}

function criaOpcaoGenero(genero){
  console.log(genero)

  novaOpcao = document.createElement("option")
  novaOpcao.value = genero
  novaOpcao.text = genero.nome

  return novaOpcao
}

function criaOpcaoCategoria(categoria){
  console.log(categoria)

  novaOpcao = document.createElement("option")
  novaOpcao.value = categoria
  novaOpcao.text = categoria.nome

  return novaOpcao
}

function criaOpcaoEditora(editora){
  console.log(editora)

  novaOpcao = document.createElement("option")
  novaOpcao.value = editora
  novaOpcao.text = editora.nomeFantasia

  return novaOpcao
}

document.addEventListener("DOMContentLoaded", function() {
  getAutores();
  getGeneros();
  getCategorias();
  getEditoras();
});