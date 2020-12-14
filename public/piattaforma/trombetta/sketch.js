// Server
let socket = io(); //setting server

//Coundown
var testo = 180; //valore countdown

// let SERIAL
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14101'; // fill in your serial port name here
// let options = {baudrate: 9600}; // change the data rate to whatever you wish
// serial.open(portName, options);
let inData; // for incoming serial data

//trombetta ICONE
let trombaIcon, tscuraIcon, tut1Icon, tut2Icon, logor, freccia; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione
let contBonus = 0; //conta quando p_coord arriva a 100

let feed_piattaforma = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente = 200 //var utente usa la trobetta, preme bottone

let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial

//variabili per DASPO
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let op = 0; //opacità rettangolo daspo
let timeout_daspo; //variabile per riavviare la funzione Timeout del daspo
let daspo_3, daspo_4, daspo_5;
let gif_daspo;


////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown
socket.on("stopTimer", dispPausaSer);
socket.on("startTimer", startTifoSer);
socket.on("resetTimer", resetTifoSer);

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  console.log(dataReceived);
  testo = dataReceived //assegna a testo dati da server
}

////////////////FINE COMUNICAZIONE SERVER/////////////////////////////////////


/////////////////////////////////////////////////////////////////////////

function preload() {
  trombaIcon = loadImage("./assets/immagini/trombettaB.png"); //trombetta chiara
  tscuraIcon = loadImage("./assets/immagini/trombetta.png"); //trombetta scura
  tut1Icon = loadImage("./assets/immagini/Tutorial_Trombetta1.png"); //trombetta tutorial 1
  tut2Icon = loadImage("./assets/immagini/Tutorial_Trombetta2.gif"); //trombetta tutorial 1
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
  freccia = loadImage("./assets/immagini/freccia.png");
  daspo_3 = loadImage("./assets/immagini/daspo3.gif");
  daspo_4 = loadImage("./assets/immagini/daspo4.gif");
  daspo_5 = loadImage("./assets/immagini/daspo5.gif");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta

  // setup SERIAL
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  w = width / 20;
  h = height / 50;

  //freccia
  b2 = createButton("");
  b2.position(w, h * 4.5);
  b2.mousePressed(dispPausa);
  b2.id('pauseBtn');
}

/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width / 20;
  h = height / 50;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w * 10, h * 5);
  fill('#B7AEB5'); //3° PALETTE
  textSize(13);
  text('SQUADRA1-SQUADRA2', w * 10, h * 6.5);

  //testo sotto
  textSize(14);
  textAlign(CORNER);
  text('BONUS', w * 1.2, h * 43);

  //logo a destra
  image(logor, w * 18.5, h * 6, logor.width / 4.5, logor.height / 4.5);

  //BARRA COORDINAZIONE
  fill('#D5D0D3'); //barra grigia
  rectMode(CENTER);
  rect(w * 10, h * 45.5, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85'); //barra viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  ///////////////BONUS//////////////////////////////////////////////////////////////

  if (p_coord === 80) {
    contBonus++;
  }
  console.log('BONUS CONTATOR:' + contBonus);

  //pallini BONUS
  for (let i = 0; i < 6; i++) {
    if (contBonus === 3 || contBonus === 4 || contBonus === 5) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      pop();
    } else if (contBonus === 6 || contBonus === 7 || contBonus === 8) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      pop();
    } else if (contBonus === 9 || contBonus === 10 || contBonus === 11 || contBonus === 12 || contBonus === 13) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      pop();
    } else if (contBonus === 14 || contBonus === 15 || contBonus === 16 || contBonus === 17 || contBonus === 18) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      pop();
    } else if (contBonus === 19 || contBonus === 20 || contBonus === 21) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      ellipse(w + 100, h * 45.5, 15);
      pop();
    } else if (contBonus === 22) {
      window.open('../bonus-app12uomo/index.html', '_self'); //doppio puntino per andare nella cartella sopra
    }
    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;
  }
  ///////////////////////////////////////////////////////////////

  //CONTATORE i DEL TEMPO
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
  }

  // BARRETTE FEED UTENTE (LINETTE)
  for (var x = w * 3.8; x < w * 8.8; x += 40) {
    if (keyIsDown(ENTER)) {
      alt = 1 * random(1, 8.5);
      input_utente = 200;
    } else {
      alt = 1;
      input_utente = 0;
    }
    noStroke();
    fill(135, 123, 133);
    rectMode(CENTER);
    rect(x, h * 25, 15, 15 * alt, 20);
    rect(w * 7.7 + x, h * 25, 15, 15 * alt, 20);
  }

  //PER LA BARRA DELLA PERCENTUALE
  if (keyIsDown(ENTER)) {
    p_coord = round((feed_piattaforma * input_utente) / 100);
  } else {
    p_coord = 0;
  }

  //PERCENTUALE
  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('COORDINAZIONE  ' + p_coord + ' %', w * 10, h * 43);
  pop();

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  //ICONA FEEDBACK DA SEGUIRE
  if (i % 2 != 0 && i > 5) {
    push();
    fill('#877B85');
    noStroke();
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(trombaIcon, width / 2, height / 2, trombaIcon.width / 1.7, trombaIcon.height / 1.7);
    pop();
    feed_piattaforma++;
  } else if (i % 2 == 0 && i > 5) { //cambio colore delle bottone centrale: feedback utente
    push();
    fill('#F9F9F9');
    stroke('#877B85');
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(tscuraIcon, width / 2, height / 2, tscuraIcon.width / 1.7, tscuraIcon.height / 1.7); // trombetta scura
    pop();
    feed_piattaforma = 0;
  }

  //rettangolo in opacità
  push();
  rectMode(CORNER)
  fill(255, 255, 255, opacità);
  rect(0, 0, width, height);
  //rettangolo diventta trasparente alla fine del tutorial
  if (i > 5) {
    opacità = 0
  }
  pop();

  //TUTORIAL TROMBETTA + TESTI GIUSTO/SBAGLATO
  if (i == 0 || i == 2 || i == 4) {
    image(tut1Icon, w * 10, h * 24.5, tut1Icon.width / 5.5, tut1Icon.height / 5.5);
    tut2Icon.reset();
    text('Segui il ritmo degli altri', w * 10, h * 31);
    let pronto = false;
    if (keyIsDown(ENTER)) {
      text('NON COORDINATO', w * 10, h * 33);
    }
  } else if (i == 1 || i == 3 || i == 5) {
    image(tut2Icon, w * 10, h * 24.5, tut2Icon.width / 5.5, tut2Icon.height / 5.5);
    text('Segui il ritmo degli altri', w * 10, h * 31);
    let pronto = true;

    if (keyIsDown(ENTER)) {
      text('CORRETTO', w * 10, h * 33);
    }
  }

  //DASPO
  //daspo condizione
  if (keyIsDown(ENTER) && i % 2 == 0 && i > 5) {
    daspo = true;
    daspo_counter++;
  } else if (keyIsDown(ENTER) && i % 2 != 0 && i > 5 && daspo != true) {
    daspo = false;
    op = 0;
  }

  //attivare funzioni daspo
  if (daspo == true) {
    daspoAttiva();
  }

  incremento_daspo = 3000 + daspo_counter * 1000;
  if (incremento_daspo > 5000) {
    incremento_daspo = 5000;
  }

  console.log("tempo daspo " + incremento_daspo)

  ///////cambio cartella //////////////////////////////////////////////////
  if (i == 30) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
  }
  //////////////////////////////////////////////////////////////////


}
///////FINE DRAW/////////////////

//funzioni per attivare la daspo
function daspoAttiva() {
  op = 210;
  alt = 1;

  push();
  rectMode(CORNER);
  fill(255, 255, 255, op);
  rect(0, 0, width, height);
  pop();

  if (incremento_daspo == 3000) {
    gif_daspo = daspo_3
  } else if (incremento_daspo == 4000) {
    gif_daspo = daspo_4
  } else if (incremento_daspo == 5000) {
    gif_daspo = daspo_5
  }


  // image(gif_daspo, width / 10, 3*height / 4, gif_daspo.width/2 , gif_daspo.height/2 );
  image(daspo_3, width / 10, 3 * height / 4, daspo_3.width / 2, daspo_3.height / 2);

  timeout_daspo = setTimeout(daspoNonAttiva, 3000);
}

//funzione per disattivare la daspo cambiando la variabile
function daspoNonAttiva() {
  daspo = false;
}

//riavvia il timer per daspo
function nonAttivafine() {
  clearTimeout(timeout_daspo);
}


// function SERIAL
function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  inData = Number(serial.read());
  console.log(inData)
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}


//funzione trombetta
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
