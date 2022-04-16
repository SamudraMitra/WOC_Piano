document.getElementById("loginForm").addEventListener("submit",function(event){
  event.preventDefault();
})
firebase.auth().onAuthStateChanged(function(user){
  if(user)
  {
    location.replace("index.html");
  }
});

function login()
{
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email,password)
  .catch((error)=>{
    alert(error.message);
  });
}
function signUp()
{
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch((error) => {
    alert(error.message);
  });
}
function forgotPass()
{
  const email=document.getElementById("email").value;
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    alert("Password Reset mail sent");
  })
  .catch((error) => {
    alert(error.message);
  });
}
const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#password");

        togglePassword.addEventListener("click", function () {
            // toggle the type attribute
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);

            // toggle the icon
            this.classList.toggle("bi-eye");
        });

        // prevent form submit
        const form = document.querySelector("form");
        form.addEventListener('submit', function (e) {
            e.preventDefault();
        });
