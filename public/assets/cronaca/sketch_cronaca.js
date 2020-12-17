// Server
let socket = io(); //setting server

//Coundown
let testo; //valore countdown

let sliderWidth;
let inc=0;
let lastInc


////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  testo = dataReceived //assegna a testo dati da server
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  sliderWidth = width/12*10;
}

function draw() {
  background('#f9f9f8');

  //minuto sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text("", width/12*5.5,inc+(height/7));
  text("TM1", width/12*5.5,inc+(height/7+height/7));
  text("TM1", width/12*5.5,inc+(height/7+2*height/7));
  text("", width/12*5.5,inc+(height/7+3*height/7));
  text("TM1", width/12*5.5,inc+(height/7+4*height/7));
  text("", width/12*5.5,inc+(height/7+5*height/7));
  pop()
  //minuto dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text("TM2", width/12*6.5,inc+(height/7));
  text("", width/12*6.5,inc+(height/7+height/7));
  text("", width/12*6.5,inc+(height/7+2*height/7));
  text("TM2", width/12*6.5,inc+(height/7+3*height/7));
  text("", width/12*6.5,inc+(height/7+4*height/7));
  text("TM2", width/12*6.5,inc+(height/7+5*height/7));
  pop()

  //testo sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(RIGHT);
  textSize(25);
  fill('#887b86');
  text('', width/12*5,inc+(height/7));
  text('ATTACCO', width/12*5,inc+(height/7+height/7));
  text('PALLA RECUPERATA', width/12*5,inc+(height/7+2*height/7));
  text('', width/12*5,inc+(height/7+3*height/7));
  text('TIRI TOTALI', width/12*5,inc+(height/7+4*height/7));
  text('', width/12*5,inc+(height/7+5*height/7));
  pop()
  //testo dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(LEFT);
  textSize(25);
  fill('#887b86');
  text('POSSESSO PALLA', width/12*7,inc+(height/7));
  text('', width/12*7,inc+(height/7+height/7));
  text('', width/12*7,inc+(height/7+2*height/7));
  text('CORNER', width/12*7,inc+(height/7+3*height/7));
  text('', width/12*7,inc+(height/7+4*height/7));
  text('GOAL', width/12*7,inc+(height/7+5*height/7));
  pop()

  //struttura
  push()
  rectMode(CORNER);
  fill('#887b86');
  noStroke();
  rect(width/12,inc+(height/7+height/7*0.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*1.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*2.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*3.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*4.4),sliderWidth,1,1);
  pop()
  push()
  rectMode(CORNER);
  fill('#f9f9f8');
  noStroke();
  rect(width/2-10,height/9,20,height/9*8);
  pop()
  push()
  strokeWeight(1);
  stroke('#887b86');
  noFill()
  line(width/2,height/9,width/2,height/9*8);
  pop()

  //ellissi
  push()
  rectMode(CORNER);
  ellipseMode(CENTER);
  strokeWeight(5)
  stroke('#F9F9F8');
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*1-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*2-height/100),height/15);pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*3-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*4-height/100),height/15);;pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*5-height/100),height/15);pop()
  pop()

  //MINUTO
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#F9F9F8');
  text("45'", width/2,inc+(height/7));
  text("45'", width/2,inc+(height/7+height/7));
  text("45'", width/2,inc+(height/7+2*height/7));
  text("45'", width/2,inc+(height/7+3*height/7));
  text("45'", width/2,inc+(height/7+4*height/7));
  text("45'", width/2,inc+(height/7+5*height/7));
  pop()

  //cornice
  push()
  rectMode(CORNER);
  fill('#F9F9F8');
  noStroke();
  rect(0,height/10*9,width,height/10);
  rect(0,0,width,height/10);
  pop()


  if (testo<175) {
    if (inc>-50){
    inc=inc-50;
    lastInc=inc}
  }

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
