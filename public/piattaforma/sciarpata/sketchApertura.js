// Server
let socket = io(); //setting server
//Coundown
var testo = 180; //valore countdown

let logoIcon;
let icon;
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
/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logopausa.png");
  icon = loadImage("./assets/immagini/sciarpa.png"); //trombetta chiara
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12); //rallenta
}
/////////////////////////////////////////////////////////////////////////
function draw() {

  if(testo == 84|| testo <84){
     window.open('index.html','_self');
  }
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon,  width/2 , height / 2, logoIcon.width/7, logoIcon.height/7);

  image(icon, width / 2, height / 6*4.5, icon.width /7.5, icon.height /7.5);



  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(15);
  fill('#877B85'); //4° colore PALETTE
  text('SCIARPATA', width / 2, height / 6*4.9);
  textSize(13);
  fill('#B7AEB5'); //3 PALETTE
  text('PREPARATI A TIFARE', width / 2, height / 6*5.1 );





}

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
}
