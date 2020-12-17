// Server
let socket = io(); //setting server

//Coundown
let testo=180; //valore countdown

let x1;
let prevX1;
let x2;
let prevX2;

let y1;
let prevY1;
let y2;
let prevY2;

let prevTesto=181;






////////////////COMUNICAZIONE SERVER/////////////////////////////////////
// RICEZIONE
socket.on("testoIn", updateTesto); //ricezione countdown

// UPDATE DA SERVER
function updateTesto(dataReceived) {
  testo = dataReceived //assegna a testo dati da server
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#f9f9f8');
  sliderWidth = width/12*10;

  x1=width/100*2.5;
  prevX1=width/100*2.5;
  x2=width/2;
  prevX2=width/2;

  y1=height/2;
  prevY1=height/2;
  y2=height/2;
  prevY2=height/2;

  //performance sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(LEFT);
  textSize(13);
  fill('#887b86');
  text("PRESTAZIONI TEAM1", (width/2-(width/100*2.5))/6*0+(width/100*2.5),height/5*0.75);
  pop()
  push()
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(13);
  fill('#887b86');
  text("+", (width/2-(width/100*2.5))/6*0+(width/100*2.5)/2,height/5*2.126);
  text("–", (width/2-(width/100*2.5))/6*0+(width/100*2.5)/2,height/5*3.126);
  pop()
  push()
  ellipseMode(CENTER);
  noFill();
  strokeCap(1);
  stroke('#887b86');
  ellipse((width/2-(width/100*2.5))/6*0+(width/100*2.5)/2,height/5*2, 10)
  ellipse((width/2-(width/100*2.5))/6*0+(width/100*2.5)/2,height/5*3, 10)
  pop()

  //linee sx
  push()
  strokeWeight(0.5);
  stroke('#D6D1D3');
  noFill()
  line(width/100*2.5,height/5*1.5,width/100*2.5,height/5*3.5);
  line((width/2-(width/100*2.5))/6+(width/100*2.5),height/5*1.5,(width/2-(width/100*2.5))/6+(width/100*2.5),height/5*3.5);
  line((width/2-(width/100*2.5))/6*2+(width/100*2.5),height/5*1.5,(width/2-(width/100*2.5))/6*2+(width/100*2.5),height/5*3.5);
  line((width/2-(width/100*2.5))/6*3+(width/100*2.5),height/5*1.5,(width/2-(width/100*2.5))/6*3+(width/100*2.5),height/5*3.5);
  line((width/2-(width/100*2.5))/6*4+(width/100*2.5),height/5*1.5,(width/2-(width/100*2.5))/6*4+(width/100*2.5),height/5*3.5);
  line((width/2-(width/100*2.5))/6*5+(width/100*2.5),height/5*1.5,(width/2-(width/100*2.5))/6*5+(width/100*2.5),height/5*3.5);
  line(width/100*2.5,height/2,width-(width/100*2.5),height/2);

  pop()
  //testo sx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(10);
  fill('#887b86');
  text("00'", (width/2-(width/100*2.5))/6*0+(width/100*2.5),height/5*4);
  text("15'", (width/2-(width/100*2.5))/6*1+(width/100*2.5),height/5*4);
  text("30'", (width/2-(width/100*2.5))/6*2+(width/100*2.5),height/5*4);
  text("45'", (width/2-(width/100*2.5))/6*3+(width/100*2.5),height/5*4);
  text("60'", (width/2-(width/100*2.5))/6*4+(width/100*2.5),height/5*4);
  text("75'", (width/2-(width/100*2.5))/6*5+(width/100*2.5),height/5*4);
  pop()
  //line centro
  push()
  strokeWeight(1);
  stroke('#887b86');
  line(width/2,height/10,width/2,height/10*9);
  pop()
  //performance dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(RIGHT);
  textSize(13);
  fill('#887b86');
  text("TEAM2 PRESTAZIONI", width-(width/100*2.5),height/5*0.75);
  pop()
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(13);
  fill('#887b86');
  text("+", width-(width/100*2.5)+(width/100*2.5)/2,height/5*2.126);
  text("–", width-(width/100*2.5)+(width/100*2.5)/2,height/5*3.126);
  pop()
  push()
  ellipseMode(CENTER);
  noFill();
  strokeCap(1);
  stroke('#887b86');
  ellipse(width-(width/100*2.5)+(width/100*2.5)/2,height/5*2, 10)
  ellipse(width-(width/100*2.5)+(width/100*2.5)/2,height/5*3, 10)
  pop()
  //linee dx
  push()
  strokeWeight(0.5);
  stroke('#D6D1D3');
  noFill()
  line((width/2-(width/100*2.5))/6+(width/2),height/5*1.5,(width/2-(width/100*2.5))/6+(width/2),height/5*3.5);
  line((width/2-(width/100*2.5))/6*2+(width/2),height/5*1.5,(width/2-(width/100*2.5))/6*2+(width/2),height/5*3.5);
  line((width/2-(width/100*2.5))/6*3+(width/2),height/5*1.5,(width/2-(width/100*2.5))/6*3+(width/2),height/5*3.5);
  line((width/2-(width/100*2.5))/6*4+(width/2),height/5*1.5,(width/2-(width/100*2.5))/6*4+(width/2),height/5*3.5);
  line((width/2-(width/100*2.5))/6*5+(width/2),height/5*1.5,(width/2-(width/100*2.5))/6*5+(width/2),height/5*3.5);
  line(width-(width/100*2.5),height/5*1.5,width-(width/100*2.5),height/5*3.5);
  pop()
  //testo dx
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(10);
  fill('#887b86');
  text("15'", (width/2-(width/100*2.5))/6+(width/2),height/5*4);
  text("30'", (width/2-(width/100*2.5))/6*2+(width/2),height/5*4);
  text("45'", (width/2-(width/100*2.5))/6*3+(width/2),height/5*4);
  text("60'", (width/2-(width/100*2.5))/6*4+(width/2),height/5*4);
  text("75'", (width/2-(width/100*2.5))/6*5+(width/2),height/5*4);
  text("90'", (width/2-(width/100*2.5))/6*6+(width/2),height/5*4);
  pop()
}

function draw() {
  let iterator = (180-testo)/100
  let noiseVal = noise(iterator) * height/100;
  let inc = noiseVal

  //incremento x-y
  x1 = map(testo,180,0,width/100*2.5,width/2);
  if (prevTesto!==testo) {
    y1+=inc;
  }
  x2 = map(testo,180,0,width/2,width-(width/100*2.5));
  if (prevTesto!==testo) {
    y2-=inc;
  }

  //riempimento sx
  push()
  noStroke()
  fill('#D6D1D3')
  beginShape();
  vertex(prevX1-0.1, prevY1);
  vertex(x1, y1);
  vertex(x1, height/2);
  vertex(prevX1-0.1, height/2);
  endShape(CLOSE);
  pop()
  //linea sx
  push()
  stroke('#887b86')
  line(prevX1, prevY1, x1, y1);
  pop()

  //riempimento dx
  push()
  noStroke()
  fill('#f0efef')
  beginShape();
  vertex(prevX2-0.1, prevY2);
  vertex(x2, y2);
  vertex(x2, height/2);
  vertex(prevX2-0.1, height/2);
  endShape(CLOSE);
  pop()
  //linea dx
  push()
  stroke('#D6D1D3')
  line(prevX2, prevY2, x2, y2);
  pop()

  prevX1=x1;
  prevY1=y1;
  prevX2=x2;
  prevY2=y2;
  prevTesto=testo

  if (testo==180){
    setup()
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
