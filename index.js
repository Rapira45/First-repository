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


