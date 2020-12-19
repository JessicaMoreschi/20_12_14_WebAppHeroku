// Server
let socket = io(); //setting server

//Coundown
var testo = 180; //valore countdown

// variabili BONUS //
let bonus_preso = 0;
let contBonus = 0;

//trombetta ICONE
let sciarpaIcon, sciarpaBIcon, logor, sAlta, sBassa; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione

let feed_piattaforma = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente ;//var utente usa la trobetta, preme bottone

let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial

//variabili per DASPO
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let op = 0; //opacità rettangolo daspo
let daspo_gif_3, daspo_gif_4, daspo_gif_5;
let durata_daspo = 0; //durata della daspo
let secondo_corrente = 0; //secondo dell'inizio daspo


let j = 0; //sottomultiplo di i, ogni i è composto da 50 j
let pulsazione = 0; //variabile per fare pulsare il cerchio della trombetta
let boulPausa = false;

///////////////////////////////////////////////////////////////////////////////////////////////////
// teachable machine
const URL = "https://storage.googleapis.com/tm-model/V-k69BewR/";

let model, capture, topPrediction, numClasses, poseData, context

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmPose.load(modelURL, metadataURL);
  numClasses = model.getTotalClasses();
}

async function predict() {
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(capture.elt)

  const predictions = await model.predict(posenetOutput)
  let highestProbability = 0
  let highestIndex
  predictions.forEach((item, index) => {
    if (item.probability > highestProbability) {
      highestProbability = item.probability
      highestIndex = index
    }
  })

  poseData = pose
  topPrediction = predictions[highestIndex].className

}


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

//UPDATE DASPO
socket.on("daspoIn", updateDaspo);

function updateDaspo(dataReceived) {
  daspo_counter = dataReceived;
}


////////////////FINE COMUNICAZIONE SERVER/////////////////////////////////////

function preload() {
  sciarpaBIcon = loadImage("./assets/immagini/sciarpa.png"); //sciarpa vuota bianca
  sciarpaIcon = loadImage("./assets/immagini/sciarpaViola.png"); //sciarpa scura
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
  sAlta = loadImage("./assets/immagini/Sciarpa_su.png");
  sBassa = loadImage("./assets/immagini/Sciarpa_giù.png");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(25)
  capture = createCapture(VIDEO)
  capture.hide()
  init()

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

  //CONTATORE i DEL TEMPO
  j++;
  if (frameCount % 35 == 0) { //multiplo di 70 incrementa i
    i++;
    j = 0;
  }

  ///////cambio cartella //////////////////////////////////////////////////

  if (testo == 130 || testo < 130) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
  }


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
  if (i > 1) {
    xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  } else {
    xBarra = 0;
  }

  push();
  rectMode(CORNER);
  fill('#877B85'); //barra viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  ///////////////BONUS//////////////////////////////////////////////////////////////

  if (p_coord == 75) {
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


  //PER LA BARRA DELLA PERCENTUALE
  if (topPrediction == 'up' && i % 2 == 0) {
    p_coord = round((feed_piattaforma * input_utente) / 100);
  } else {
    p_coord = 0;
  }
  console.log(feed_piattaforma);

  //PERCENTUALE
  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('COORDINAZIONE  ' + p_coord + ' %', w * 10, h * 43);
  pop();

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  //ICONA FEEDBACK DA SEGUIRE
  if (i % 2 != 0 && i > 1) {

    image(sciarpaBIcon, w * 10, h * 25, sciarpaBIcon.width / 6, sciarpaBIcon.height / 6); //chiara
    feed_piattaforma = 0;
  } else if (i % 2 == 0 && i > 1) { //cambio colore delle bottone centrale: feedback utente
    if (j == 0 || j == 23 || j == 46 || j == 70) { //pulsazioni del cerchio
      pulsazione = 0
    } else if (j < 12 || j > 23 && j < 35 || j > 46 && j < 58) {
      pulsazione += 4;
    } else if (j > 12 && j < 23 || j > 35 && j < 46 || j > 58 && j < 70) {
      pulsazione -= 4;
    }
    push()
    noStroke()
    fill("#E5E5E5")
    ellipse(width / 2, height / 2, 100 + pulsazione)
    pop() //fine puslazioni cerchio

    document.getElementById("tutorial2").style.display = "none";
    image(sciarpaIcon, w * 10, h * 25, sciarpaIcon.width / 6, sciarpaIcon.height / 6); // scura
    feed_piattaforma++;

  }

  //rettangolo in opacità
  push();
  rectMode(CORNER)
  fill(255, 255, 255, opacità);
  rect(0, 0, width, height);
  //rettangolo diventta trasparente alla fine del tutorial
  if (i > 1) {
    opacità = 0
  }
  pop();

  //TUTORIAL sciarpa

  if ((i == 0 ) & (boulPausa == false)) {

    document.getElementById("tutorial").style.display = "block";
    document.getElementById("tutorial2").src = "./assets/immagini/Tutorial_S-giu.gif";
    document.getElementById("tutorial2").style.display = "none";
    text('Alzala quando richiesto', w * 10, h * 29.5);
    if (topPrediction == 'up') {
      text('CORRETTO', w * 10, h * 31.5);
      p_coord = 70;
    }
  } else if ((i == 1 ) & (boulPausa == false)) {
    document.getElementById("tutorial").src = "./assets/immagini/Tutorial_S-su.gif";
    document.getElementById("tutorial2").style.display = "block";
    document.getElementById("tutorial").style.display = "none";

    text('Porta in basso la sciarpa', w * 10, h * 29.5);

    if (topPrediction == 'up') {
      text('NON COORDINATO', w * 10, h * 31.5);
      p_coord = 70;
    }
  } else if (boulPausa == true) {
    document.getElementById("tutorial2").style.display = "none";
    document.getElementById("tutorial").style.display = "none";
  }


  // FEED UTENTE (PALLINI COLORATI)
  if (topPrediction == 'up' && i % 2 == 0) { //alza la sciarpa
    pulsazione = 0;
    input_utente = 290;
    push();
    var z = 25 + p_coord;
    tint(255, z * 3.5); // Display at half opacity
    image(sAlta, width / 2, height / 2, sAlta.width / 3, sAlta.height / 3);
    pop();

    predict()
  } else if (topPrediction == 'up' && i % 2 != 0) { //abbassa la sciarpa
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);

    predict()
  } else {
    input_utente = 0;
    image(sBassa, width / 2, height / 2, sBassa.width / 3, sBassa.height / 3);

    predict()
  }

  //DASPO
  //daspo condizione
  if (topPrediction == 'up' && i % 2 != 0 && i > 3 && j > 15 && daspo == false) {
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


  //console.log (topPrediction);


  //////////////////////////////////////////////////////////////////
}


///////FINE DRAW/////////////////////////////////////////////////////


//funzione trombetta
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


///////COMANDI PAUSA-STOP-RESET/////////////////////////////////////////////////////
//funzioni per attivare la pausa
function dispPausa() {
  socket.emit("stopTimer");
  boulPausa = true;
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("tutorial2").style.display = "none";
  document.getElementById("schermo").style.backgroundColor = "#877B85";
  document.getElementById("startTifo").style.display = "block";
  document.getElementById("resetTifo").style.display = "block";
  document.getElementById("contTifo").style.display = "block";
  document.getElementById("abbTifo").style.display = "block";
  document.getElementsByClassName("iconPausa").style.display = "block";
}

function startTifo() {
  socket.emit("startTimer");
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function resetTifo() {
  socket.emit("resetTimer");
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function dispPausaSer() {
  boulPausa = true;
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("tutorial2").style.display = "none";
  document.getElementById("schermo").style.backgroundColor = "#877B85";
  document.getElementById("startTifo").style.display = "block";
  document.getElementById("resetTifo").style.display = "block";
  document.getElementById("contTifo").style.display = "block";
  document.getElementById("abbTifo").style.display = "block";
  document.getElementsByClassName("iconPausa").style.display = "block";
}

function startTifoSer() {
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}

function resetTifoSer() {
  boulPausa = false;
  document.getElementById("schermo").style.backgroundColor = "transparent";
  document.getElementById("startTifo").style.display = "none";
  document.getElementById("resetTifo").style.display = "none";
  document.getElementById("contTifo").style.display = "none";
  document.getElementById("abbTifo").style.display = "none";
  document.getElementsByClassName("iconPausa").style.display = "none";
}
