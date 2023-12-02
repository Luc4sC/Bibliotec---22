function get(url){
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getLivro(isbn){
    let url = "http://localhost:8080/livro/buscar/" + encodeURI(isbn)

    buscaLivro = get(url)

    livro = JSON.parse(buscaLivro)

    passarDadosLivro(livro)
}

function buscar(event){
    event.preventDefault()

    isbn = document.getElementById("isbn").value

    getLivro(isbn)
}


function passarDadosLivro(livro){ 
    pISBN = document.getElementById("infoISBN")
    pTitulo = document.getElementById("infoTitulo")
    pIdioma = document.getElementById("infoSubtitulo")
    pAutor = document.getElementById("infoAutor")
    pGenero = document.getElementById("infoGenero")
    pCategoria = document.getElementById("infoCategoria")
    pData = document.getElementById("infoData")
    pEditora = document.getElementById("infoEditora")
    imgLivro = document.getElementById("img")
    
    pISBN.innerHTML = livro.isbn 
    pTitulo.innerHTML = livro.titulo + " " + livro.subtitulo 
    pIdioma.innerHTML = livro.idioma
    pAutor.innerHTML = livro.autor.nomeArtistico
    pGenero.innerHTML = livro.genero.nome
    pCategoria.innerHTML = livro.categoria.nome
    pData.innerHTML = livro.data
    pEditora.innerHTML = livro.editora.nomeFantasia
    console.log(livro.imagemBase64)
    imgLivro.src = "data:image/jpeg;base64," + livro.imagemBase64

    imgLivro.innerHTML;
}



//Método para criar elementos pós pesquisar livro

// function mostrarLivro(livro){         
//     divContainer = document.createElement("div")
//     divDados = document.createElement("div")
//     divDadosLivro = document.createElement("div")
//     divLivro = document.createElement("div")
//     divImagem = document.createElement("div")
//     tagImagem = document.createElement("img")

//     colunaLivro = document.createElement("article")
//     colunaLivro2 = document.createElement("article")

//     divInfo1 = document.createElement("div")
//     divInfo2 = document.createElement("div")
//     divInfo3 = document.createElement("div")
//     divInfo4 = document.createElement("div")
//     divInfo5 = document.createElement("div")
//     divInfo6 = document.createElement("div")
//     divInfo7 = document.createElement("div")
//     divInfo8 = document.createElement("div")

//     h4ISBN
//     h4Titulo
//     h4Subtitulo
//     Autor


//     divContainer.className = "container"
//     divDados.className = "dados"
//     divDadosLivro.className = "dadosLivro"
//     divLivro.className = "livro"
//     divImagem.className = "imagemLivro"
//     colunaLivro.className = "colunaLivro"
//     colunaLivro2.className = "colunaLivro"

//     divInfo1.className = "informacao"
//     divInfo2.className = "informacao"
//     divInfo3.className = "informacao"
//     divInfo4.className = "informacao"
//     divInfo5.className = "informacao"
//     divInfo6.className = "informacao"
//     divInfo7.className = "informacao"
//     divInfo8.className = "informacao"

//     divImagem.appendChild(tagImagem)
// }


//Pegar rm que estpá utilizando o site
// rm = localStorage.getItem('rm') /livro/buscar/{isbn}
// alert("Seja bem-vindo " + rm)
// console.log("Seja bem-vindo " + rm)