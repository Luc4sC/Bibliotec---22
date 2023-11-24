// function imageToByteArray(imageFile) {
//   var reader = new FileReader();
//   let bytes;

//     // Lê o conteúdo da imagem como uma sequência de bytes
//     reader.readAsArrayBuffer(imageFile);

//   // Evento disparado quando a leitura do arquivo estiver concluída
//   reader.onloadend = function () {
//       // Obtém os bytes como um array
//       bytes = new Uint8Array(reader.result);
      
//       // Chama a função de retorno de chamada com o array de bytes
//       // callback(bytes);
//   };

//   return bytes
// }

function imagemBase64(input, callback) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          if (e.target && e.target.result) {
              var base64Image = e.target.result;
              base64Image.trim();
              base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
              
              console.log(base64Image);

              // Chame a função de callback com a imagem codificada em Base64
              callback(base64Image);
          } else {
              console.error('Resultado da leitura indefinido ou nulo.');
          }
      };

      reader.readAsDataURL(input.files[0]);
  } else {
      console.error('Nenhum arquivo selecionado.');
  }
}

function criarRequisicaoLivro(){

    event.preventDefault()

    let imagemForm = document.getElementById("imagemLivro");

    // Forneça uma função de retorno de chamada para receber a imagem codificada em Base64
    imagemBase64(imagemForm, function (imagem) {
        console.log(imagem);

        // Continue com o restante do código que depende da imagem
        // Restante do código...
        let url = "http://localhost:8080/livro/cadastrar"

        let titulo = document.getElementById("tituloLivro").value;
        let subtitulo = document.getElementById("subtituloLivro").value;
        let categoria = document.getElementById("categoriaLivro").value;
        let genero = document.getElementById("generoLivro").value;
        let isbn = document.getElementById("isbnLivro").value;
        let numeroPaginas = document.getElementById("paginasLivro").value;
        let autor = document.getElementById("autorLivro").value;
        let data = document.getElementById("dataLivro").value;
        let editora = document.getElementById("editoraLivro").value;
        
        console.log(titulo)
        console.log(subtitulo)
        console.log(isbn)
        console.log(numeroPaginas)
        console.log(data)
        console.log(genero)
        console.log(editora)
        console.log(autor)
        console.log(categoria)
        console.log(imagem)
    
        body = {"titulo": titulo, 
        "subtitulo": subtitulo, 
        "categoria": categoria,
        "genero": genero,
        "editora" : editora,
        "isbn": isbn,
        "numeroPaginas": numeroPaginas,
        "autor":autor,
        "imagemBase64": imagem,
        "data": data
        }
    
        cadastrarLivro(url, body)
    });


}

function cadastrarLivro(url, livro){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(livro))

    request.onload = function(){
        console.log(this.responseText)
    }

    return this.responseText
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
  novaOpcao.value = autor.nomeArtistico
  novaOpcao.text = autor.nomeArtistico

  return novaOpcao
}

function criaOpcaoGenero(genero){
  console.log(genero)

  novaOpcao = document.createElement("option")
  novaOpcao.value = genero.nome
  novaOpcao.text = genero.nome

  return novaOpcao
}

function criaOpcaoCategoria(categoria){
  console.log(categoria)

  novaOpcao = document.createElement("option")
  novaOpcao.value = categoria.nome
  novaOpcao.text = categoria.nome

  return novaOpcao
}

function criaOpcaoEditora(editora){
  console.log(editora)

  novaOpcao = document.createElement("option")
  novaOpcao.value = editora.nomeFantasia
  novaOpcao.text = editora.nomeFantasia

  return novaOpcao
}

document.addEventListener("DOMContentLoaded", function() {
  getAutores();
  getGeneros();
  getCategorias();
  getEditoras();
});