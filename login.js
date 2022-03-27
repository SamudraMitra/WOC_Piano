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
    console.log(error.message);
  });
}
function signUp()
{
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch((error) => {
    console.log(error.message);
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
    console.log(error.message);
  });
}
