// Server
let socket = io(); //setting server

//Coundown
let testo; //valore countdown

let d;

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
  d= width/20;

  background('#f9f9f8');

  push()
  rectMode(CORNER);
  noStroke();
  fill('rgba(214,209,211,0.25)')
  for (var i = width/12; i < width/12*11; i+=width/12*2) {
    rect(i, height/9, width/12, height/9*7)
  }
  pop()

  push()
  strokeWeight(1);
  stroke('#887b86');
  noFill()
  line(width/12,height/9,width/12,height/9*8);
  line(width/2,height/9,width/2,height/9*8);
  rectMode(CORNERS);
  rect(width/12,height/7*2,width/12*2.5,height/7*5);
  rect(width/12,height/7*2.7,width/12*2.5/1.5,height/7*4.3)
  pop()


  push()
  rotate(2*PI);
  fill('#887b86');
  ellipseMode(CENTER);
  noStroke();
  ellipse(width/12*1.5, height/2, d)

  ellipse(width/12*1.5+width/12, height/2-width/24*3, d)
  ellipse(width/12*1.5+width/12, height/2-width/24, d)
  ellipse(width/12*1.5+width/12, height/2+width/24, d)
  ellipse(width/12*1.5+width/12, height/2+width/24*3, d)


  ellipse(width/12*1.5+width/12*2, height/2-width/24, d)
  ellipse(width/12*1.5+width/12*2, height/2+width/24, d)

  ellipse(width/12*1.5+width/12*3, height/2-width/12, d)
  ellipse(width/12*1.5+width/12*3, height/2, d)
  ellipse(width/12*1.5+width/12*3, height/2+width/12, d)

  ellipse(width/12*1.5+width/12*4, height/2, d)
  pop()

  push()
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(40);
  fill('f9f9f8')

  text("1",width/12*1.5, height/2+height/50)

  text("6", width/12*1.5+width/12, height/2-width/24*3+height/50)
  text("10", width/12*1.5+width/12, height/2-width/24+height/50)
  text("3", width/12*1.5+width/12, height/2+width/24+height/50)
  text("7", width/12*1.5+width/12, height/2+width/24*3+height/50)


  text("8", width/12*1.5+width/12*2, height/2-width/24+height/50)
  text("4", width/12*1.5+width/12*2, height/2+width/24+height/50)

  text("2", width/12*1.5+width/12*3, height/2-width/12+height/50)
  text("11", width/12*1.5+width/12*3, height/2+height/50)
  text("5", width/12*1.5+width/12*3, height/2+width/12+height/50)

  text("9", width/12*1.5+width/12*4, height/2+height/50)
  pop()

  //dx
  push()
  strokeWeight(1);
  stroke('#887b86');
  noFill()
  line(width/12*11,height/9,width/12*11,height/9*8);
  rectMode(CORNERS);
  rect(width/12*11,height/7*2,width/12*9.5,height/7*5);
  rect(width/12*11,height/7*2.7,width/12*10.35,height/7*4.3)
  pop()


  push()
  fill('#D6D1D3');
  ellipseMode(CENTER);
  noStroke();
  ellipse(width/12*10.5, height/2, d)

  ellipse(width/12*10.5-width/12, height/2-width/24*3, d)
  ellipse(width/12*10.5-width/12, height/2-width/24, d)
  ellipse(width/12*10.5-width/12, height/2+width/24, d)
  ellipse(width/12*10.5-width/12, height/2+width/24*3, d)


  ellipse(width/12*10.5-width/12*2, height/2-width/24, d)
  ellipse(width/12*10.5-width/12*2, height/2+width/24, d)

  ellipse(width/12*10.5-width/12*3, height/2-width/12, d)
  ellipse(width/12*10.5-width/12*3, height/2, d)
  ellipse(width/12*10.5-width/12*3, height/2+width/12, d)

  ellipse(width/12*10.5-width/12*4, height/2, d)
  pop()


  push()
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(40);
  fill('#887b86')

  text("1",width/12*10.5, height/2+height/50)

  text("8", width/12*10.5-width/12, height/2-width/24*3+height/50)
  text("5", width/12*10.5-width/12, height/2-width/24+height/50)
  text("4", width/12*10.5-width/12, height/2+width/24+height/50)
  text("3", width/12*10.5-width/12, height/2+width/24*3+height/50)


  text("9", width/12*10.5-width/12*2, height/2-width/24+height/50)
  text("10", width/12*10.5-width/12*2, height/2+width/24+height/50)

  text("7", width/12*10.5-width/12*3, height/2-width/12+height/50)
  text("11", width/12*10.5-width/12*3, height/2+height/50)
  text("6", width/12*10.5-width/12*3, height/2+width/12+height/50)

  text("2", width/12*10.5-width/12*4, height/2+height/50)
  pop()

  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text('TM1', width/12*5.5,height/6);
  text('TM2', width/12*6.5,height/6);
  pop()
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
