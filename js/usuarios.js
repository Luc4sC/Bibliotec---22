let UrlAPIBibliotecLocal = "http://localhost:8080/"
let UrlAPIUsersLocal = "http://localhost:4500/api/users/"
let urlTesteAPIBibliotec = "https://tcc-22-teste-api.up.railway.app/"
let urlAPIUsers = "https://bibliotecusers-production.up.railway.app/api/users/" 

function get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function limparTabela() {
    let tabela = document.getElementById("tabelaUsuario");
    let tabela2 = document.getElementById("table2");

    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
    while (tabela2.firstChild) {
        tabela2.removeChild(tabela2.firstChild);
    }
}

function buscarRM(event){
    event.preventDefault()
    let rm = document.getElementById("rm").value

    console.log(rm)
    limparTabela()
    getUser(rm)
    getRequisicoes(rm)
}

function getRequisicoes(rm){
    
    // buscaEmprestimos = get("http://localhost:8080/emprestimo/buscar/" + encodeURIComponent(rm))
    buscaEmprestimos = get("tcc-22-teste-api.up.railway.app/emprestimo/buscar/" + encodeURIComponent(rm))

    emprestimos = JSON.parse(buscaEmprestimos)

    let tabela = document.getElementById("table2");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headISBN = document.createElement("th");
    headLivro = document.createElement("th");
    headSituacao = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headLivro.innerHTML = "Livro";
    headISBN.innerHTML = "ISBN";
    headSituacao.innerHTML = "Situação";

    headLinha.appendChild(headLivro)
    headLinha.appendChild(headISBN)
    headLinha.appendChild(headSituacao)

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)

    emprestimos.forEach(emprestimo => {
        let linha = criarLinhaEmprestimo(emprestimo);
        bodyTabela.appendChild(linha);
    });
}

function criarLinhaEmprestimo(emprestimo){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    link = document.createElement("a");

    tdLink = document.createElement("td");
    tdLivro = document.createElement("td");
    tdISBN = document.createElement("td");
    tdSituacao = document.createElement("td");

    //Definindo os valores dos elementos
    link.href = "efetuacao.html";
    link.text = "Ver";
    link.name = emprestimo.dataRequisicao
    link.id = emprestimo.usuario.ra
    link.className = emprestimo.livro.isbn
    link.addEventListener("click", function (event) {
        event.preventDefault();
    
        // Obtém os valores apropriados dos atributos do link
        let dataRequisicao = this.name;
        let rmRequisicao = this.id;
        let isbn = this.className;
    
        // Chama a função salvarRequisicao com os valores corretos
        salvarRequisicao(dataRequisicao, rmRequisicao, isbn);
    
        // Redireciona para a próxima página se necessário
        window.location.href = this.getAttribute("href");
    });

    tdLivro.innerHTML = emprestimo.livro.titulo + " " + emprestimo.livro.subtitulo
    tdISBN.innerHTML = emprestimo.livro.isbn
    tdSituacao.innerHTML = emprestimo.statusPedido
    tdLink.appendChild(link);

    //Inserindo elementos na Tabela
    linha.appendChild(tdLivro)
    linha.appendChild(tdISBN)
    linha.appendChild(tdSituacao)
    linha.appendChild(tdLink)

    return linha;
}

function getUser(rm){
    buscaUsuario = get("http://localhost:4500/api/users/user/" + encodeURIComponent(rm))

    usuario = JSON.parse(buscaUsuario);

    let tabela = document.getElementById("tabelaUsuario")


    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headNome = document.createElement("th");
    headStatus = document.createElement("th");
    headRM = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headNome.innerHTML = "Nome";
    headStatus.innerHTML = "Status";
    headRM.innerHTML = "RM";

    headLinha.appendChild(headNome)
    headLinha.appendChild(headStatus)
    headLinha.appendChild(headRM)

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)

    let linha = criarLinhaUser(usuario)
    bodyTabela.appendChild(linha)

    console.log(usuario)
}

function criarLinhaUser(usuario){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    botaoBloquear = document.createElement("button");
    botaoDesbloquear = document.createElement("button");

    iconBloquear = document.createElement("ion-icon");
    iconDesbloquear = document.createElement("ion-icon");
    

    tdBloquear = document.createElement("td");
    tdDesbloquear = document.createElement("td");
    tdNome = document.createElement("td");
    tdStatus = document.createElement("td");
    tdRM = document.createElement("td");

    //Definindo os valores dos elementos
    iconBloquear.name = "ban-outline";
    botaoBloquear.type = 'submit';
    botaoBloquear.className = 'delete';
    botaoBloquear.appendChild(iconBloquear);
    botaoBloquear.id = usuario.ra;
    botaoBloquear.onclick =function() {
        bloquearUsuario(this.id);
    };

    //Definindo os valores dos elementos
    iconDesbloquear.name = "checkmark-outline";
    botaoDesbloquear.type = 'submit';
    botaoDesbloquear.className = 'delete';
    botaoDesbloquear.appendChild(iconDesbloquear);
    botaoDesbloquear.id = usuario.ra;
    botaoDesbloquear.onclick =function() {
        desbloquearUsuario(this.id);
    };

    tdBloquear.appendChild(botaoBloquear);
    tdDesbloquear.appendChild(botaoDesbloquear)

    tdNome.innerHTML = usuario.userName
    tdStatus.innerHTML = usuario.status
    tdRM.innerHTML = usuario.ra

    //Inserindo elementos na Tabela
    linha.appendChild(tdNome)
    linha.appendChild(tdStatus)
    linha.appendChild(tdRM)
    linha.appendChild(tdDesbloquear)
    linha.appendChild(tdBloquear)

    return linha;
}

function post(url){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send()

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)
    }

    return this.responseText
}

function bloquearUsuario(rm){
    let url = "http://localhost:4500/api/users/block/account/" + encodeURI(rm)

    post(url)
}

function desbloquearUsuario(rm){
    let url = "http://localhost:4500/api/users/unlock/account/" + encodeURI(rm)

    post(url)
}

function salvarRequisicao(dataRequisicao, rmRequisicao, isbn) {
    localStorage.setItem("dataRequisicao", dataRequisicao);
    localStorage.setItem("rmRequisicao", rmRequisicao);
    localStorage.setItem("isbn", isbn);
}