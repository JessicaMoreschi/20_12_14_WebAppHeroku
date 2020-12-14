// Server
let socket = io(); //setting server

//Coundown
var testo = 180; //valore countdown

//impostazioni riconoscimento vocale
let lang = 'it-IT';
let speechRec = new p5.SpeechRec(lang, gotSpeech);

//colori contenitori parole
let textColorS = '#877B85';
let textColorD = '#877B85';
let textColorC = '#877B85';
let bButtonColorS = '#F9F9F9';
let bButtonColorD = '#F9F9F9';
let bButtonColorC = '#F9F9F9';
let bonus5 = 0; //se i bonus sono tutti attivi apri un altra parte di sketch

//icone
let baloonIcon, baloon_Puntini, noParola, logor, freccia;
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS
let palette = ['#F9F9F9', '#D5D0D3', '#B7AEB5', '#877B85'];
let i = 0; //contatore che regola ritmo
let i_ritardo;
let p_coord = 0; //var coordinazione

let input_utente = 0; //var utente che parla
let opacità = 210 //opacità rettangolo tutorial
let pronto //coordinzaione tutorial
let p = 0; //contatore parole

// var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
// 	myRec.continuous = true; // do continuous recognition
// 	myRec.interimResults = true; // allow partial recognition (faster, less accurate)

//Volume daspo
let mic;
//variabili per DASPO
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let op = 1; //opacità rettangolo daspo
let incremento_daspo = 0;
let timeout_daspo; //variabile per riavviare la funzione Timeout del daspo
let daspo_3, daspo_4, daspo_5;
let gif_daspo;
/////////////////////////////////////////////////////////////////////////



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


function preload() {
  baloonIcon = loadImage("./assets/barretteParola.gif"); //nuvoletta attiva
  baloon_Puntini = loadImage("./assets/scuro.gif"); //nuvoletta pensa
  noParola = loadImage("./assets/noParola.png"); //nuvoletta attiva
  logor = loadImage("./assets/logopiccolo.png") //logo ridotto
  freccia = loadImage("./assets/freccia.png");
  daspo_3 = loadImage("./assets/daspo3.gif");
  daspo_4 = loadImage("./assets/daspo4.gif");
  daspo_5 = loadImage("./assets/daspo5.gif");
}

////////////setup/////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta

  //impostazioni riconoscimento vocale
  let continuous = true; //continua a registrare
  let interim = true;
  speechRec.start(continuous, interim);

  // //microfono get: Create an Audio input
  mic = new p5.AudioIn();
  mic.start();

  w = width / 20;
  h = height / 50;

  //freccia
  b2 = createButton("");
  b2.position(w, h * 4.5);
  b2.mousePressed(dispPausa);
  b2.id('pauseBtn');
}

/////////////////////////////////////////////////////////////////////////////

function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

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
  fill('#D5D0D3'); //griga
  rectMode(CENTER);
  rect(w * 10, h * 45.5, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85'); //viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w * 10 - width / 7, h * 45.5 - 7.5, xBarra, 15, 20);
  pop();

  //pallini BONUS
  for (let i = 0; i < 6; i++) {
    if (p_coord > 60) {
      push();
      fill('#877B85');
      ellipse(w, h * 45.5, 15);
      pop();
    }
    ellipse(w + s, h * 45.5, 15);
    s = 25 * i;
  }

  /////////////////// LA PARTE SOPRA è STANDARD ///////////////////////////////////////////////
  //microfono input
  //let vol = round(mic.getLevel(), 2) * 1000;
  ////console.log('volume: ' + vol);
  if (bonus5 == 1) {
    document.getElementById("tutorial").style.display = "none";
    push();
    //CONTENITORI PAROLE VECCHE
    rectMode(CENTER);
    strokeWeight(5);
    stroke(textColorS) //viola
    fill(bButtonColorS) //bianco
    rect(w * 6, h * 31, w * 3, 60, 40);
    stroke(textColorD) //viola
    fill(bButtonColorD) //bianco
    rect(w * 14, h * 31, w * 3, 60, 40);
    //nuova parola
    stroke(textColorC) //viola
    fill(bButtonColorC) //bianco
    rect(w * 10, h * 31, w * 3, 60, 40);

    noStroke();
    textSize(30);
    textAlign(CENTER, TOP);
    fill(textColorS);
    text('forza.', w * 6, h * 31 - 15);
    fill(textColorD);
    text('bravi.', w * 14, h * 31 - 15);
    fill(textColorC);
    text('oplà.', w * 10, h * 31 - 15);
    pop();

    //ICONA CENTRALE CHE REAGISCE AL MIC
    if (p == 0) { // cambio colore del bottone centrale: feedback utente
      image(baloonIcon, width / 2, h * 20, baloonIcon.width / 4, baloonIcon.height / 4);
    } else if (p == 1) {
      image(noParola, width / 2, h * 20, noParola.width / 4, noParola.height / 4);
    }

  } else {
    push();
    //CONTENITORI SCRITTE DA PRONUNCIARE
    rectMode(CENTER);
    stroke(textColorS) //viola
    strokeWeight(5);
    fill(bButtonColorS) //bianco
    rect(w * 6, height / 2, w * 4, 60, 40);
    stroke(textColorD) //viola
    fill(bButtonColorD) //bianco
    rect(w * 14, height / 2, w * 4, 60, 40);

    noStroke();
    textSize(30);
    textAlign(CENTER, TOP);
    fill(textColorS) //viola
    text('forza.', w * 6, height / 2 - 15);
    fill(textColorD) //viola
    text('bravi.', w * 14, height / 2 - 15);
    pop();

    //ICONA CENTRALE CHE REAGISCE AL MIC
    if (i > 1 && p == 0) { // cambio colore del bottone centrale: feedback utente
      image(baloonIcon, width / 2, height / 2, baloonIcon.width / 4, baloonIcon.height / 4);
    } else if (i > 1 && p == 1) {
      image(noParola, width / 2, height / 2, noParola.width / 4, noParola.height / 4);
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

    //TUTORIAL
    push();
    textSize(16);
    fill('#B7AEB5'); //3 PALETTE
    if (i < 1 || i == 1) {
      document.getElementById("tutorial").style.display = "block";
      text('Scegli una parola', w * 10, h * 31);
      text('ESULTA QUANDO RICHIESTO', w * 10, h * 33);
    } else {
      document.getElementById("tutorial").style.display = "none";
    }
  }

  //ritmo
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
  }

  //PERCENTUALE
  if (input_utente == 1 && i > i_ritardo + 1) {
    p_coord = round(random(10, 80));
    input_utente = 0;
  }

  push();
  textAlign(CORNER);
  fill('#B7AEB5'); //3° PALETTE
  text('SCELTA DA  ' + p_coord + ' % DEGLI UTENTI', w * 10, h * 43);
  pop();

  //volume per daspo
  let vol = mic.getLevel();
  let vol_1 = round(map(vol, 0, 1, 0, 100));
  //console.log("volume " + vol)


  //DASPO
  //daspo condizione
  if (vol_1 > 30 && i > 1) {
    daspo = true;
    daspo_counter++;
  } else if (vol_1 < 30 && i < 1) {
    daspo = false;
    op = 0;
  }

  //attivare funzioni daspo
  if (daspo == true) {
    daspoAttiva();
  }

  incremento_daspo = 3000 + (daspo_counter) * 1000;
  if (incremento_daspo > 5000) {
    incremento_daspo = 5000;
  }

  //console.log("tempo daspo " + incremento_daspo)

}
////////fine draw///////////////////////////////////////////////////////////////////////////////////

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


  image(gif_daspo, width / 10, 3 * height / 4, gif_daspo.width / 2, gif_daspo.height / 2);

  timeout_daspo = setTimeout(daspoNonAttiva, incremento_daspo);
}

//funzione per disattivare la daspo cambiando la variabile
function daspoNonAttiva() {
  daspo = false;
}

//riavvia il timer per daspo
function nonAttivafine() {
  clearTimeout(timeout_daspo);
}

////////// Riconoscimento vocale parole //////////////////////////////////////////////////////////////

function gotSpeech() {
  //  if(prima_p == 0){
  if (i > 1 && p == 0) {
    //console.log('p ' + p);
    if (speechRec.resultValue) {
      if (speechRec.resultString == 'forza') {
        //sx
        bButtonColorS = '#877B85';
        textColorS = '#F9F9F9';
        input_utente = 1;
        p = 1;
        i_ritardo = i;

      } else if (speechRec.resultString == 'bravi') {
        bButtonColorD = '#877B85';
        textColorD = '#F9F9F9';
        input_utente = 1;
        p = 1;
        i_ritardo = i;

      } else if (speechRec.resultString == 'Oplà') {
        bButtonColorC = '#877B85';
        textColorC = '#F9F9F9';
        input_utente = 1;
        p = 1;
        i_ritardo = i;
      }

      //console.log(speechRec.resultString);

    }
  }
}

/////////////////////////////////////////////////////////////////////////

function mouseClicked() {
  bonus5 = 1;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

///////COMANDI PAUSA-STOP-RESET/////////////////////////////////////////////////////
//funzioni per attivare la pausa
function dispPausa() {
  socket.emit("stopTimer");
  document.getElementById("tutorial").style.display = "none"
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
  document.getElementById("tutorial").style.display = "none"
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
