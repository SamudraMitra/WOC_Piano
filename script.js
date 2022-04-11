document.getElementById("storeSong").addEventListener("submit", function(event) {
  event.preventDefault();
})
var numberofkeys = document.querySelectorAll(".key").length;
var keys = ["z", "s", "x", "d", "c", "v", "g", "b", "h", "n", "j", "k"];
let lengthOfNotes = 0;
var recording = "false";
// var uemail="";
for (var i = 0; i < numberofkeys; i++) {
  document.querySelectorAll(".key")[i].addEventListener("click", function() {
    var HTMLkey = this.innerHTML;
    makeSound(HTMLkey);
  });
}


function makeSound(key) {
  if (recording == "true") {
    recordNote(key);
  }

  switch (key) {
    case "Z":
    case "z":
      var A = new Audio('Notes/G.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "G";
      break;
    case "S":
    case "s":
      var A = new Audio('Notes/Ab.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Ab";
      break;
    case "X":
    case "x":
      var A = new Audio('Notes/A.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "A";
      break;
    case "D":
    case "d":
      var A = new Audio('Notes/Bb.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Bb";
      break;
    case "C":
    case "c":
      var A = new Audio('Notes/B.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "B";
      break;
    case "V":
    case "v":
      var A = new Audio('Notes/C.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "C";
      break;
    case "G":
    case "g":
      var A = new Audio('Notes/Db.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Db";
      break;
    case "B":
    case "b":
      var A = new Audio('Notes/D.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "D";
      break;
    case "H":
    case "h":
      var A = new Audio('Notes/Eb.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Eb";
      break;
    case "N":
    case "n":
      var A = new Audio('Notes/E.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "E";
      break;
    case "J":
    case "j":
      var A = new Audio('Notes/F.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "F";
      break;
    case "M":
    case "m":
      var A = new Audio('Notes/Gb.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Gb";
      break;
    case "<":
    case ",":
      var A = new Audio('Notes/G1.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "G";
      break;
    case "L":
    case "l":
      var A = new Audio('Notes/Ab1.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Ab1";
      break;
    case ">":
    case ".":
      var A = new Audio('Notes/A1.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "A1";
      break;
    case "p":
    case "P":
      var A = new Audio('Notes/Bb1.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "Bb1";
      break;
    case "?":
    case "/":
      var A = new Audio('Notes/B1.mp3');
      A.play();
      document.getElementById("notedisp").innerHTML = "B1";
      break;
  }
}

function recordNote(key) {
  songNotes.push({
    note: key,
    time: Date.now() - recordingStartTime
  })
  lengthOfNotes++;
}
document.addEventListener("keydown", function(event) {
  makeSound(event.key);
});


var userId = "";
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    location.replace("login.html");
  } else {
    document.getElementById("user").innerHTML = "Hello, " + user.email;
    userId = user.uid;
  }
})

function logout() {
  firebase.auth().signOut().then();
}
let seconds = 0;
let minutes = 0;
let hours = 0;
let interval = null;
let status = "stopped";
let displaysec = 0;
let displaymin = 0;
let displayhrs = 0;
let recordingStartTime;
let songNotes = [];

function stopWatch() {
  seconds++;
  if (seconds / 60 == 1) {
    seconds = 0;
    minutes++;
    if (minutes / 60 == 1) {
      minutes = 0;
      hours++;
    }
  }
  if (seconds <= 9) {
    displaysec = "0" + seconds.toString();
  } else {
    displaysec = seconds;

  }
  if (minutes <= 9) {
    displaymin = "0" + minutes.toString();
  } else {
    displaymin = minutes;

  }
  if (hours <= 9) {
    displayhrs = "0" + hours.toString();
  } else {
    displayhrs = hours;

  }
  document.getElementById("display").innerHTML = displayhrs + ":" + displaymin + ":" + displaysec;
}

function startStop() {

  if (status === "stopped") {
    interval = window.setInterval(stopWatch, 1000);
    document.getElementById("startStop").innerHTML = "Stop";
    status = "started";
    recordingStartTime = Date.now();
    songNotes = [];
    recording = "true";
  } else {
    window.clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Start";
    status = "stopped";
    recording = "false";
  }
}

function reset() {
  window.clearInterval(interval);
  seconds = 0;
  minutes = 0;
  hours = 0;
  document.getElementById("display").innerHTML = "00:00:00";
  document.getElementById("startStop").innerHTML = "Start";
  songNotes = [];
  recordingStartTime = 0;
  recording = "false";
  lengthOfNotes = 0;
}

function playRecording() {
  playSong(songNotes);
}

function playSong(songNotes) {
  console.log(songNotes);
  songNotes.forEach((obj) => {
    setTimeout(() => {
      makeSound(obj.note);
    }, obj.time)


  });
}
var arrOfAllSongs = [];

function store() {
  var songName = document.getElementById("songName").value;
  const song = {
    id: userId,
    nameOfSong: songName,
    songdata: songNotes
  }
  arrOfAllSongs.push(song);

}
var arrn = [];

function update() {
  console.log("hi");

  for (var i = 0; i < arrOfAllSongs.length; i++) {
    arrn.push(arrOfAllSongs[i]);
  }
  firebase.database().ref("recordings").get().then((snapshot) => {
    var l = 0;
    if (snapshot.exists()) {
      l = snapshot.val().length;
    }
    for (var i = 0; i < l; i++) {
      arrn.push((snapshot.val())[i]);

    }

    firebase.database().ref("recordings").set(arrn);

  });
  console.log(arrn);
}
firebase.database().ref("recordings").get().then((snapshot) => {
  var l = 0;
  if (snapshot.exists()) {
    l = snapshot.val().length;
  }
  for (var i = 0; i < l; i++) {
    if (((snapshot.val())[i]).id == userId) {
      const list = document.getElementById("recdd");
      const song_name = ((snapshot.val())[i]).nameOfSong;
      const entry = document.createElement('li');
      entry.appendChild(document.createTextNode(song_name));
      entry.classList.add("songlist");
      list.appendChild(entry);
    }
  }
  enableplay();
});

function enableplay() {

  for (var i = 0; i < document.querySelectorAll(".songlist").length; i++) {
    document.querySelectorAll(".songlist")[i].addEventListener("click", function() {
      var songn = this.innerHTML;
      firebase.database().ref("recordings").get().then((snapshot) => {
        var l = 0;
        if (snapshot.exists()) {
          l = snapshot.val().length;
        }
        for (var i = 0; i < l; i++) {
          if ((((snapshot.val())[i]).id == userId) && (((snapshot.val())[i].nameOfSong) == songn)) {
            playSong(((snapshot.val())[i].songdata));
          }
        }
      })
    });
  }

}

function showinstr() {
  window.open('instructions.html', '_blank');
}
