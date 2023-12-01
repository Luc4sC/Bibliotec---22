function login(){
    event.preventDefault()

    let url = "http://localhost:4500/api/users/login"

    let loginUser = document.getElementById("loginUser").value;
    let password = document.getElementById("password").value;
    
    console.log(loginUser)
    console.log(password)
    
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
          console.log(data);
          alert(JSON.stringify(data));
          localStorage.setItem("rm", data.ra)
          window.location.href = 'inicio.html';
          return JSON.stringify(data);
        })
}
