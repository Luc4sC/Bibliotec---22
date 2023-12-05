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

function login(event){
  event.preventDefault()
  let url = encodeURI(urlUsers) + encodeURI("login")

  let loginUser = document.getElementById("loginUser").value;
  let password = document.getElementById("password").value;
  body = {"login" : loginUser, "password" : password}
  logar(url, body)
}

function logar(url, body){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data.category)
    if(data.category == 'LIBRARIAN'){
      console.log(data.ra)
      alert("Seja Bem-Vindo " + data.userName)
      sessionStorage.setItem("rm", data.ra)
      window.location.href = 'inicio.html';
     return JSON.stringify(data);  
    }
    console.log(data.ra)
    alert("Somente Bibliotecários Podem acessar o Sistema")
  });

  sessionStorage.setItem('usuarioLogado', '1')
  console.log(sessionStorage.getItem('usuarioLogado'))
}