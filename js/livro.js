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
  
  function criarBodyLivro(){
  
      event.preventDefault()
  
      let imagemForm = document.getElementById("imgLivro");
  
      // Forneça uma função de retorno de chamada para receber a imagem codificada em Base64
      imagemBase64(imagemForm, function (imagem) {
  
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
          let sinopse = document.getElementById("sinopseLivro").value;
          let idioma = document.getElementById("idiomaLivro").value;

          
          console.log(titulo)
          console.log(subtitulo)
          console.log(isbn)
          console.log(numeroPaginas)
          console.log(data)
          console.log(genero)
          console.log(editora)
          console.log(autor)
          console.log(categoria)
          console.log(sinopse)
          console.log(idioma)
          console.log(imagem)
      
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
        getLivros
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
  
     autores.forEach(autor => {
      let opcao = criaOpcaoAutor(autor);
      seletor.add(opcao)
      });
  
     console.log(autores)
  }
  
  function getGeneros(){
    buscaGeneros = get("http://localhost:8080/genero/buscar")
  
    //Transforma JSON para JS
    generos = JSON.parse(buscaGeneros);
  
    let seletor = document.getElementById("generoLivro");
  
    generos.forEach(genero => {
     let opcao = criaOpcaoGenero(genero);
     seletor.add(opcao)
     });
  
    console.log(generos)
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
 
    console.log(livros)
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
    let url = "http://localhost:8080/livro/deletar/"

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
  });