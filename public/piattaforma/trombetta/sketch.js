// Server
let socket = io(); //setting server

//Coundown
var testo = 180; //valore countdown

// variabili BONUS /
let bonus_preso = 0;
let contBonus = 0;
//let contBonusSever;

// let SERIAL
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14101'; // fill in your serial port name here
// let options = {baudrate: 9600}; // change the data rate to whatever you wish
// serial.open(portName, options);
let inData; // for incoming serial data

//trombetta ICONE
let trombaIcon, tscuraIcon, tut1Icon, tut2Icon, logor; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione


let feed_piattaforma = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente; //var utente usa la trobetta, preme bottone

let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial

let trombettaSocket=false

//variabili per DASPO
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let op = 0; //opacità rettangolo daspo
let daspo_gif_3, daspo_gif_4, daspo_gif_5;
let durata_daspo = 0; //durata della daspo
let secondo_corrente = 0; //secondo dell'inizio daspo


let j = 0; //sottomultiplo di i, ogni i è composto da 50 j
let pulsazione = 0; //variabile per fare pulsare il cerchio della trombetta


////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown
socket.on("stopTimer", dispPausaSer);
socket.on("startTimer", startTifoSer);
socket.on("resetTimer", resetTifoSer);
socket.on("trombettaSocketOn", trSocketOn);
socket.on("trombettaSocketOff", trSocketOff);

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  testo = dataReceived //assegna a testo dati da server
}
function trSocketOn(){
  trombettaSocket=true
  console.log('emitENTER-Si')
}
function trSocketOff(){
  trombettaSocket=false
  console.log('emitENTER-No')
}
// RICEZIONE BONUS
socket.on("bonusIn", bonus_server);

function bonus_server(data) {
  contBonus = data.bonus;
  bonus_preso = data.b_tot;
}

//UPDATE DASPO
socket.on("daspoIn", updateDaspo);

function updateDaspo(dataReceived) {
  daspo_counter = dataReceived;
}


/////////////////////////////////////////////////////////////////////////

function preload() {
  trombaIcon = loadImage("./assets/immagini/trombettaB.png"); //trombetta chiara
  tscuraIcon = loadImage("./assets/immagini/trombetta.png"); //trombetta scura
  tut1Icon = loadImage("./assets/immagini/Tutorial_T1.png"); //trombetta tutorial 1
  tut2Icon = loadImage("./assets/immagini/Tutorial_T2.gif"); //trombetta tutorial 1
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
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
  //contBonus = contBonusSever;
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
    //EMIT BONUS
    let message = {
      bonus: contBonus,
      b_tot: bonus_preso,
    }
    socket.emit("bonusOut", message);
  }
  //console.log('BONUS CONTATOR:' + contBonus);

  //pallini BONUS
  for (let i = 0; i < 4; i++) {
    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;
    if (contBonus === 1 ) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      pop();

    } else if (contBonus === 2 ) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      pop();

    } else if (contBonus === 3 ) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      pop();

    } else if (contBonus === 4 ) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      ellipse(w + 25, h * 45.5, 15);
      ellipse(w + 50, h * 45.5, 15);
      ellipse(w + 75, h * 45.5, 15);
      pop();

    } else if (contBonus === 5 ) {
      window.open('../bonus/index.html', '_self');
    }

  }

  ///////////////////////////////////////////////////////////////

  //CONTATORE i DEL TEMPO
  j++;
  if (frameCount % 40 == 0) { //multiplo di 50 incrementa i
    i++;
    j = 0;
  }

  // BARRETTE FEED UTENTE (LINETTE)
  for (var x = w * 3.8; x < w * 8.8; x += 40) {
    if (inData == 49 && daspo == false || keyIsDown(ENTER) || trombettaSocket==true && daspo == false) {
      alt = 1 * random(1, 8.5);
      input_utente = 250;
      pulsazione = 0;
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
  if (inData == 49 || keyIsDown(ENTER) || trombettaSocket==true) {
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
  if (i % 2 != 0 && i > 3) {

    if (j == 0 || j == 25 || j == 50) { //pulsazioni del cerchio
      pulsazione = 0
    } else if (j < 12 || j > 25 && j < 37) {
      pulsazione += 4;
    } else if (j > 12 && j < 25 || j > 37 && j < 50) {
      pulsazione -= 4;
    }
    push()
    noStroke()
    fill("#E5E5E5")
    ellipse(width / 2, height / 2, 100 + pulsazione)
    pop() //fine puslazioni cerchio

    push();
    fill('#877B85');
    noStroke();
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(trombaIcon, width / 2, height / 2, trombaIcon.width / 1.7, trombaIcon.height / 1.7);
    pop();
    feed_piattaforma++;
  } else if (i % 2 == 0 && i > 3) { //cambio colore delle bottone centrale: feedback utente
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
  if (i > 3) {
    opacità = 0
  }
  pop();

  //TUTORIAL TROMBETTA + TESTI GIUSTO/SBAGLATO
  if (i == 0 || i == 2) {
    image(tut1Icon, w * 10, h * 24.5, tut1Icon.width / 5.5, tut1Icon.height / 5.5);
    tut2Icon.reset();
    text('Segui il ritmo degli altri', w * 10, h * 31);
    let pronto = false;
    if (inData == 49 || keyIsDown(ENTER) || trombettaSocket==true) {
      text('NON COORDINATO', w * 10, h * 33);
    }
  } else if (i == 1 || i == 3) {
    image(tut2Icon, w * 10, h * 24.5, tut2Icon.width / 5.5, tut2Icon.height / 5.5);
    text('Segui il ritmo degli altri', w * 10, h * 31);
    let pronto = true;

    if (inData == 49 || keyIsDown(ENTER) || trombettaSocket==true) {
      text('CORRETTO', w * 10, h * 33);
    }
  }

  //////DASPO

  //daspo condizione
  if (inData == 49 && i % 2 == 0 && i > 5 && j > 10 && daspo == false || keyIsDown(ENTER) && i % 2 == 0 && i > 5 && j > 10 && daspo == false || trombettaSocket==true && i % 2 == 0 && i > 5 && j > 10 && daspo == false) {
    daspo = true;
    daspo_counter++;
    secondo_corrente = testo;
  }


  //rettangolo in poacità per la daspo
  push();
  rectMode(CORNER);
  fill(255, 255, 255, op);
  rect(0, 0, width, height);
  pop();

  //gif diverse per durate diverse
  if (!daspo_gif_3) {
    daspo_gif_3 = createImg("./assets/immagini/daspo3.gif");
    daspo_gif_3.hide();
  }

  if (!daspo_gif_4) {
    daspo_gif_4 = createImg("./assets/immagini/daspo4.gif");
    daspo_gif_4.hide();
  }

  if (!daspo_gif_5) {
    daspo_gif_5 = createImg("./assets/immagini/daspo5.gif");
    daspo_gif_5.hide();
  }

  //quando daspo==true fa partire la daspo giusta in base al numero di daspo
  if (daspo == true) {
    op = 210;
    alt = 1;

    if (daspo_counter == 1) {
      durata_daspo = 3;
      daspo_gif_3.show();
      daspo_gif_3.size(150, AUTO);
      daspo_gif_3.position(width / 20, 3 * height / 4);
    } else if (daspo_counter == 2) {
      durata_daspo = 4;
      daspo_gif_4.show();
      daspo_gif_4.size(150, AUTO);
      daspo_gif_4.position(width / 20, 3 * height / 4);
    } else if (daspo_counter > 2) {
      durata_daspo = 5;
      daspo_gif_5.show();
      daspo_gif_5.size(150, AUTO);
      daspo_gif_5.position(width / 20, 3 * height / 4);
    }
  }

  //chiusur daspo dopo tot secondi
  if (daspo == true && testo == secondo_corrente - durata_daspo) {
    op = 0;
    daspo = false;
    if (daspo_counter == 1) {
      daspo_gif_3.hide();
    } else if (daspo_counter == 2) {
      daspo_gif_4.hide();
    } else if (daspo_counter > 2) {
      daspo_gif_5.hide();
    }
  }

  socket.emit("daspoOut", daspo_counter);
  console.log("daspo totale " + daspo_counter);

  ///////cambio cartella //////////////////////////////////////////////////
  if (testo == 30 || testo < 30) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
  }
  //////////////////////////////////////////////////////////////////


///// feedback bottone trombetta emit
  if (inData == 49) {
    socket.emit("trombettaSocketOn");
  }

  if (inData == 48) {
    socket.emit("trombettaSocketOff");
  }
}
///////FINE DRAW/////////////////



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
