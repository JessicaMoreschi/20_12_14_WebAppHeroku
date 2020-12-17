// Server
let socket = io(); //setting server
//Coundown
var testo = 180; //valore countdown
// variabili BONUS ///
let bonus_preso = 0;
let contBonus = 0;

let icon;
let w, h, s;
let i=0; //posizione

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

 function bonus_server(data){
     contBonus = data.bonus;
     bonus_preso = data.b_tot;
   }

/////////////////////////////////////////////////////////////////////////

function preload() {
  icon = loadImage("./assets/line.png");
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12); //rallenta

}
/////////////////////////////////////////////////////////////////////////
function draw() {
  contBonus = 0; //azzerare i bonus
  bonus_preso = 1; //per dire che hai completato una fascia di bonus

  //EMIT BONUS
        let message = {
          bonus: contBonus,
          b_tot: bonus_preso,
        }
          socket.emit("bonusOut",message);

      if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
        i++;
      }
///////cambio cartella //////////////////////////////////////////////////
if(i = 15 ){
         window.open('../indexPausa.html', '_self');
       }

  background('#887b86');//scuro
  imageMode(CENTER); //per pittogrammi
  w = width / 20;
  h = height / 50;

  image(icon, width / 2, height / 2, icon.width / 6, icon.height /6);
  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
    textSize(27);
    fill('#f9f9f8'); //4° colore PALETTE
    text('Buon Tifo,', w*10, height / 50 *13);

    fill('#d6d1d3'); //3° PALETTE
    text('hai sbloccato un bonus',w*10,  height / 50 *15);
    textSize(13);
    text('BONUS',w*10,  h*44);

push();
    //CONTENITORI PAROLE VECCHE
    rectMode(CENTER);
    stroke('#d6d1d3')
    strokeWeight(5);
    fill('#887b86')
    rect(w * 6, h*31, w * 3, 60, 40);
    rect(w * 14, h*31, w * 3, 60, 40);
    //nuova parola
    stroke('#f9f9f8')
    rect(w * 10 , h*31, w * 3, 60, 40);
pop();

    noStroke();
    textSize(30);
    textAlign(CENTER, TOP);
    fill('#d6d1d3');
    text('forza.', w * 6, h*31 - 15);
    text('bravi.', w * 14, h*31 - 15);
    fill('#f9f9f8');
    text('oppla.', w * 10, h*31 - 15);


  //pallini BONUS
  ellipseMode(CENTER)
  noStroke();
  fill('#d6d1d3');
  for (let i = 0; i < 6; i++) {
        ellipse(w*9 + s, h * 42, 15);
    s = 30 * i;
  }

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
