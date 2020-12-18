// Server
let socket = io(); //setting server

//Coundown
let testo; //valore countdown

let sliderWidth;
let inc;



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
  text("TM1", width/12*5.5,inc+(height/7));
  text("TM1", width/12*5.5,inc+(height/7+height/7));
  text("TM1", width/12*5.5,inc+(height/7+2*height/7));
  text("TM1", width/12*5.5,inc+(height/7+3*height/7));
  text("TM1", width/12*5.5,inc+(height/7+6*height/7));
  text("TM1", width/12*5.5,inc+(height/7+9*height/7));
  text("TM1", width/12*5.5,inc+(height/7+11*height/7));
  text("TM1", width/12*5.5,inc+(height/7+12*height/7));
  text("TM1", width/12*5.5,inc+(height/7+15*height/7));
  pop()
  //minuto dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text("TM2", width/12*6.5,inc+(height/7));
  text("TM2", width/12*6.5,inc+(height/7+4*height/7));
  text("TM2", width/12*6.5,inc+(height/7+5*height/7));
  text("TM2", width/12*6.5,inc+(height/7+7*height/7));
  text("TM2", width/12*6.5,inc+(height/7+8*height/7));
  text("TM2", width/12*6.5,inc+(height/7+10*height/7));
  text("TM2", width/12*6.5,inc+(height/7+12*height/7));
  text("TM2", width/12*6.5,inc+(height/7+15*height/7));
  pop()

  //testo sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(RIGHT);
  textSize(25);
  fill('#887b86');
  text('INIZIO', width/12*5,inc+(height/7));
  text('ATTACCO', width/12*5,inc+(height/7+height/7));
  text('PALLA RECUPERATA', width/12*5,inc+(height/7+2*height/7));
  text('ATTACCO PERICOLOSO', width/12*5,inc+(height/7+3*height/7));
  text('PALLA RECUPERATA', width/12*5,inc+(height/7+6*height/7));
  text('ATTACCO PERICOLOSO', width/12*5,inc+(height/7+9*height/7));
  text('CORNER – FUORI', width/12*5,inc+(height/7+11*height/7));
  text('FINE PRIMO TEMPO', width/12*5,inc+(height/7+12*height/7));
  text('INIZIO SECONDO TEMPO', width/12*5,inc+(height/7+15*height/7));


  pop()
  //testo dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(LEFT);
  textSize(25);
  fill('#887b86');
  text('PALLA RECUPERATA', width/12*7,inc+(height/7+4*height/7));
  text('ATTACCO PERICOLOSO', width/12*7,inc+(height/7+5*height/7));
  text('PALLA RECUPERATA', width/12*7,inc+(height/7+7*height/7));
  text('TIRO IN PORTA – FUORI', width/12*7,inc+(height/7+8*height/7));
  text('PALLA RECUPERATA', width/12*7,inc+(height/7+10*height/7));


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
  rect(width/12,inc+(height/7+height/7*5.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*6.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*7.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*8.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*9.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*10.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*11.4),sliderWidth,1,1);
  rect(width/12,inc+(height/7+height/7*14.4),sliderWidth,1,1);



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
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*3-height/100),height/15);pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*4-height/100),height/15);;pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*5-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*6-height/100),height/15);pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*7-height/100),height/15);pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*8-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*9-height/100),height/15);pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*10-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*11-height/100),height/15);pop()
  push();fill('#887b86');ellipse(width/2,inc+(height/7+height/7*12-height/100),height/15);pop()
  push();fill('#D6D1D3');ellipse(width/2,inc+(height/7+height/7*15-height/100),height/15);pop()
  pop()

  //MINUTO
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#F9F9F8');
  text("180'", width/2,inc+(height/7));
  text("172'", width/2,inc+(height/7+height/7));
  text("166'", width/2,inc+(height/7+2*height/7));
  text("160'", width/2,inc+(height/7+3*height/7));
  text("155'", width/2,inc+(height/7+4*height/7));
  text("152'", width/2,inc+(height/7+5*height/7));
  text("145'", width/2,inc+(height/7+6*height/7));
  text("143'", width/2,inc+(height/7+7*height/7));
  text("128'", width/2,inc+(height/7+8*height/7));
  text("116'", width/2,inc+(height/7+9*height/7));
  text("106'", width/2,inc+(height/7+10*height/7));
  text("102'", width/2,inc+(height/7+11*height/7));
  text("90'", width/2,inc+(height/7+12*height/7));
  text("89'", width/2,inc+(height/7+15*height/7));


  pop()

  //cornice
  push()
  rectMode(CORNER);
  fill('#F9F9F8');
  noStroke();
  rect(0,height/10*9,width,height/10);
  rect(0,0,width,height/10);
  pop()


  inc=-(180-testo)*10;

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
