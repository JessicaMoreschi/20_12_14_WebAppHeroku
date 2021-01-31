// Server
let socket = io(); //setting server

//Coundown
var testo = 180; //valore countdown

// variabili BONUS ///
let bonus_preso = 0;
let contBonus = 0;

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

//icone
let baloonIcon, baloon_Puntini, noParola, logor;
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

/////// variabili DASPO //////////////////////////////////////////////
let mic; //Volume daspo
let daspo = false; //variabile che dice se daspo è attiva in questo momento
let daspo_counter = 0; //variabile che conta il numero di daspo
let op = 0; //opacità rettangolo daspo
let daspo_gif_3, daspo_gif_4, daspo_gif_5;
let durata_daspo = 0; //durata della daspo
let secondo_corrente = 0; //secondo dell'inizio daspo

let j = 0; //sottomultiplo di i, ogni i è composto da 50 j
let pulsazione = 0; //variabile per fare pulsare il cerchio della trombetta

//let p_e1,p_e2
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

//UPDATE DASPO
socket.on("daspoIn", updateDaspo);

function updateDaspo(dataReceived) {
  daspo_counter = dataReceived;
}

// RICEZIONE BONUS
socket.on("bonusIn", bonus_server);

function bonus_server(data) {
  contBonus = data.bonus;
  bonus_preso = data.b_tot;
}

////////////////FINE COMUNICAZIONE SERVER/////////////////////////////////////

function preload() {
  baloonIcon = loadImage("./assets/feed_parla.gif");  //nuvoletta attiva
  baloon_Puntini = loadImage("./assets/scuro.gif"); //nuvoletta pensa
  noParola = loadImage("./assets/noParola.png"); //nuvoletta attiva
  logor = loadImage("./assets/logopiccolo.png") //logo ridotto
}

////////////setup/////////////////////////////////////////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);

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

///////////////BONUS/////////////////////////////////////////////////////////////
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

  /////////////////// LA PARTE SOPRA è STANDARD ///////////////////////////////////////////////

  if (bonus_preso == 1) {
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
  j++;
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
    j = 0;
  }

  //PERCENTUALE
  if (input_utente == 1 && i > i_ritardo + 1) {
    p_coord = round(random(10, 80));
    input_utente = 0;
    if (p_coord > 55) {
      contBonus ++;

      //EMIT BONUS
      let message = {
        bonus: contBonus,
        b_tot: bonus_preso,
      }
      socket.emit("bonusOut", message);
    }
  }

  if (i > i_ritardo + 2) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
  }
  ///////cambio cartella //////////////////////////////////////////////////
  if (testo == 100 || (testo < 99  && testo > 80) ) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
  } else if (testo == 6 || testo < 6) {
    window.open('../indexPausa.html', '_self'); //doppio puntino per andare nella cartella sopra
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
  if (vol_1 > 50 && i > 1 && daspo == false) {
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
    daspo_gif_3 = createImg("./assets/daspo3.gif");
    daspo_gif_3.hide();
  }

  if (!daspo_gif_4) {
    daspo_gif_4 = createImg("./assets/daspo4.gif");
    daspo_gif_4.hide();
  }

  if (!daspo_gif_5) {
    daspo_gif_5 = createImg("./assets/daspo5.gif");
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
  console.log(vol_1)
  socket.emit("daspoOut", daspo_counter);
  console.log("daspo totale " + daspo_counter);

}
////////fine draw///////////////////////////////////////////////////////////////////////////////////


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
  bonus_preso = 1;
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
