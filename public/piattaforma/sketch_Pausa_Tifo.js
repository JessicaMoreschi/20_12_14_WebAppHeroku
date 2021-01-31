// Server
let socket = io(); //setting server
//Coundown
var testo = 180; //valore countdown
let logoIcon;
// variabili BONUS ///
let bonus_preso = 0;
let contBonus = 0;
//let random_tifo;
let i;
////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown
socket.on("stopTimer", dispPausaSer);
socket.on("startTimer", startTifoSer);
socket.on("resetTimer", resetTifoSer);

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  testo = dataReceived //assegna a testo dati da server
}
// RICEZIONE BONUS
socket.on("bonusIn", bonus_server);

function bonus_server(data) {
  contBonus = data.bonus;
  bonus_preso = data.b_tot;
}
/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logo.png");
  //benvenuto = loadImage("./assets/immagini/benvenuto.png"); //trombetta chiara
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}
/////////////////////////////////////////////////////////////////////////
function draw() {
  //CONTATORE i DEL TEMPO
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
  }
  //if (mouseIsPressed) {
  if (testo == 165 || testo == 164 || testo == 163) {
    window.open('./sciarpata/indexApertura.html', '_self');
  } else if (testo == 128 || testo == 127 || testo == 126) {
    window.open('./esultazioni/indexApertura.html', '_self');
  } else if (testo == 89 || testo == 88 || testo == 87) {
    window.open('./trombetta/indexApertura.html', '_self');
  } else if (testo == 16 || testo == 15 || testo == 14 ) {
    window.open('./esultazioni/indexApertura.html', '_self');
  } else if (testo == "finish") {
    window.open('./pagellino/index.html', '_self');
  }

  //EMIT BONUS
  let message = {
    bonus: contBonus,
    b_tot: bonus_preso,
  }
  socket.emit("bonusOut", message);
  //fine draw
}
/////////////////////////////////////////////////////////////////////



///////COMANDI PAUSA-STOP-RESET/////////////////////////////////////////////////////
//funzioni per attivare la pausa
function dispPausa() {
  socket.emit("stopTimer");
  document.getElementById("schermo").style.backgroundColor = "#877B85";
  document.getElementById("startTifo").style.display = "block";
  document.getElementById("resetTifo").style.display = "block";
  document.getElementById("contTifo").style.display = "block";
  document.getElementById("abbTifo").style.display = "block";
  document.getElementsByClassName("iconPausa").style.display = "block";
}

function startTifo() {
  socket.emit("startTimer");
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function resetTifo() {
  socket.emit("resetTimer");
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function dispPausaSer() {
  document.getElementById("schermo").style.backgroundColor = "#877B85";
  document.getElementById("startTifo").style.display = "block";
  document.getElementById("resetTifo").style.display = "block";
  document.getElementById("contTifo").style.display = "block";
  document.getElementById("abbTifo").style.display = "block";
  document.getElementsByClassName("iconPausa").style.display = "block";
}

function startTifoSer() {
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function resetTifoSer() {
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}
