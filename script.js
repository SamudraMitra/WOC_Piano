console.log("Yes");
var numberofkeys=document.querySelectorAll(".key").length;
var keys=["z","s","x","d","c","v","g","b","h","n","j","k"];
for(var i=0;i<numberofkeys;i++)
{
  document.querySelectorAll(".key")[i].addEventListener("click",function(){
    var HTMLkey=this.innerHTML;
    makeSound(HTMLkey);
  });
}
function makeSound(key)
{
    switch (key) {
      case "Z":
      case "z":
      var A = new Audio('Notes/C.mp3');
      A.play();
      break;
      case "S":
      case "s":
      var A= new Audio('Notes/Db.mp3');
      A.play();
      break;
      case "X":
      case "x":
      var A = new Audio('Notes/D.mp3');
      A.play();
      break;
      case "D":
      case "d":
      var A = new Audio('Notes/Eb.mp3');
      A.play();
      break;
      case "C":
      case "c":
      var A = new Audio('Notes/E.mp3');
      A.play();
      break;
      case "V":
      case "v":
      var A = new Audio('Notes/F.mp3');
      A.play();
      break;
      case "G":
      case "g":
      var A = new Audio('Notes/Gb.mp3');
      A.play();
      break;
      case "B":
      case "b":
      var A = new Audio('Notes/G.mp3');
      A.play();
      break;
      case "H":
      case "h":
      var A = new Audio('Notes/Ab.mp3');
      A.play();
      break;
      case "N":
      case "n":
      var A = new Audio('Notes/A.mp3');
      A.play();
      break;
      case "J":
      case "j":
      var A = new Audio('Notes/Bb.mp3');
      A.play();
      break;
      case "M":
      case "m":
      var A = new Audio('Notes/B.mp3');
      A.play();
    }
}
document.addEventListener("keydown",function(event){
  makeSound(event.key);
  keyAnimation(event.key);
});
function keyAnimation(currentKey)
{
  var activebutton=document.querySelector("."+currentKey);
  activebutton.classList.add("pressed");
  setTimeout(function(){
    activebutton.classList.remove("pressed");
  },100);
}
firebase.auth().onAuthStateChanged(function(user){
  if(!user)
  {
    location.replace("login.html");
  }
  else
  {
    document.getElementById("user").innerHTML="Hello, "+user.email;
  }
})
function logout(){
    firebase.auth().signOut().then();
}
