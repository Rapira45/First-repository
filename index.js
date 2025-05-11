let eye = document.querySelector(".eye")
let inputPass = document.querySelector(".pass")

eye.addEventListener("click", function() {
    if(inputPass.type === "password") {
        inputPass.type = "text"
        eye.src = "photo_2025-02-22_11-31-36.jpg";
    }
    else{
        inputPass.type = "password";
        eye.src = "photo_2025-02-21_17-23-45.jpg";
    }
});

let info = {}
let emailInput = document.querySelector("#email")
let passInput = document.querySelector("#password")

emailInput.addEventListener("input", function() {
    info.email = this.value
});

passInput.addEventListener("input", function(){
    info.password = this.value
});


const emailLog = document.querySelector("#email")
const passLog = document.querySelector(".pass")
const button = document.querySelector(".back-info")

button.addEventListener("click", async (e) => {
  e.preventDefault();
  
  try {
    const info = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    const response = await fetch('http://localhost:3000/sign-up', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration error");
    }

    if (data.user?.id) {
      localStorage.setItem('userId', data.user.id);
      window.location.href = "tapalka.html"; 
    }
    
  } catch (error) {
    alert(error.message);
  }
});
