function get(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    
    return request.response
}

function getEditoras(){
    buscaEditoras = get("http://localhost:8080/editora/buscar")
 
    //Transforma JSON para JS
    editoras = JSON.parse(buscaEditoras);
 
    let tabela = document.getElementById("tabela");

    headTabela = document.createElement("thead");
    headLinha = document.createElement("tr");
    headVazio = document.createElement("th");
    headNome = document.createElement("th");
    headRazao = document.createElement("th");
    headCnpj = document.createElement("th");
    bodyTabela = document.createElement("tbody")

    headVazio.id = "vazio3";

    headVazio.innerHTML = "";
    headNome.innerHTML = "Nome Fantasia";
    headRazao.innerHTML = "Razão Social";
    headCnpj.innerHTML = "CNPJ";

    headLinha.appendChild(headVazio);
    headLinha.appendChild(headNome);
    headLinha.appendChild(headRazao);
    headLinha.appendChild(headCnpj);

    headTabela.appendChild(headLinha)
    tabela.appendChild(headTabela)
    tabela.appendChild(bodyTabela)
    
    editoras.forEach(editora => {
     let linha = criarLinha(editora);
     bodyTabela.appendChild(linha);
     });
 
    console.log(editoras)
}

function criarLinha(editora){
    //Criando elementos no HTML
    linha = document.createElement("tr");
    botao = document.createElement("button");
    icon = document.createElement("ion-icon");
    tdBotao = document.createElement("td");
    tdNome = document.createElement("td");
    tdRazao = document.createElement("td");
    tdCnpj = document.createElement("td");
    
    //Definindo os valores dos elementos
    icon.name = "trash-outline";
    botao.type = 'submit';
    botao.className = 'delete';
    botao.appendChild(icon);
    botao.id = editora.nomeFantasia;
    botao.onclick =function() {
        deleteEditora(this.id);
    };
    // "clickTeclado(this.value);"

    tdBotao.appendChild(botao);
    tdBotao.scope = "row";

    tdBotao.innerHTML;
    tdNome.innerHTML = editora.nomeFantasia;
    tdRazao.innerHTML = editora.razaoSocial;
    tdCnpj.innerHTML = editora.cnpj;

    //Inserindo elementos na Tabela
    linha.appendChild(tdBotao)
    linha.appendChild(tdNome)
    linha.appendChild(tdRazao)
    linha.appendChild(tdCnpj)

    return linha;
}

function limparTabela() {
    let tabela = document.getElementById("tabela");
    while (tabela.firstChild) {
        tabela.removeChild(tabela.firstChild);
    }
}

function criarBodyEditora(){
    event.preventDefault()

    let url = "http://localhost:8080/editora/cadastrar"

    let nomeFantasia = document.getElementById("nomeFantasiaEditora").value;
    let razaoSocial = document.getElementById("razaoSocialEditora").value;
    let cnpj = document.getElementById("cnpjEditora").value;
    let email = document.getElementById("emailEditora").value;
    let telefone = document.getElementById("telefoneEditora").value;
    let cep = document.getElementById("cepEditora").value;
    let logradouro = document.getElementById("logradouroEditora").value;
    let numero = document.getElementById("numeroEditora").value;
    let bairro = document.getElementById("bairroEditora").value;
    let cidade = document.getElementById("cidadeEditora").value;

    console.log(nomeFantasia)
    console.log(razaoSocial)
    console.log(cnpj)
    console.log(email)
    console.log(telefone)
    console.log(cep)
    console.log(logradouro)
    console.log(numero)
    console.log(bairro)
    console.log(cidade)

    endereco = { "cep" : cep,
        "logradouro" : logradouro,
        "numero" : numero,
        "bairro" : bairro,
        "cidade" : cidade
    }

    body = {"nomeFantasia" : nomeFantasia,
        "razaoSocial" : razaoSocial,
        "cnpj" : cnpj,
        "dadosEndereco" : endereco,
        "email" : email,
        "telefone" : telefone
        }

    postEditora(url, body)
}

function postEditora(url, body){
    let request = new XMLHttpRequest()
    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getEditoras();
    }

    return this.responseText
}

function deleteEditora(nomeFantasia){
    let url = "http://localhost:8080/editora/deletar/"

    let request = new XMLHttpRequest()
    request.open("DELETE", url + encodeURIComponent(nomeFantasia))
    request.send()

    request.onload = function(){
        console.log(this.responseText)
        alert(this.responseText)

        limparTabela();
        getEditoras();
    }

    return this.responseText
}

//Chama Funções ao Iniciar A Página
document.addEventListener("DOMContentLoaded", function() {
    getEditoras();
  });