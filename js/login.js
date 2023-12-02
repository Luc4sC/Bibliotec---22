function login(event){
  event.preventDefault()
  let url = "http://localhost:4500/api/users/login"

  let loginUser = document.getElementById("loginUser").value;
  let password = document.getElementById("password").value;
  console.log("COCO")
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
      localStorage.setItem("rm", data.ra)
      window.location.href = 'inicio.html';
     return JSON.stringify(data);  
    }
    console.log(data.ra)
    alert("Somente Bibliotecários Podem acessar o Sistema")
  });
}
