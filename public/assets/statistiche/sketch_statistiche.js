// Server
let socket = io(); //setting server

//Coundown
let testo; //valore countdown

let sliderWidth;
let mgTM1 = 2;
let mgTM2 = 1;
let golTM1 = 0;
let golTM2 = 0;
let pvTM1 = 80;
let pvTM1R=80;
let pvTM2;

let nullgolTM1 = golTM1;
let nullgolTM2 = golTM2;


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

  push()
  rectMode(CORNER);
  fill('rgba(214,209,211,0.25)');
  noStroke();
  rect(0, height/3*1.75, width, height/3*1.75*2)
  pop()

  if (golTM1 == 0) {
    nullgolTM1 = 0.001
  }else {
    nullgolTM1 = golTM1
  };
  if (golTM2 == 0) {
    nullgolTM2 = 0.001
  }else {
    nullgolTM2 = golTM2
  };
  if (mgTM1 == 0) {
    nullmgTM1 = 0.001
  }else {
    nullmgTM1 = mgTM1
  };
  if (mgTM2 == 0) {
    nullmgTM2 = 0.001
  }else {
    nullmgTM2 = mgTM2
  };

  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text('TM1', width/12*5,height/7*1.5);
  text('TM2', width/12*6.97,height/7*1.5);
  text('TM1', width/12*2,height/7*6);
  text('TM2', width/12*10,height/7*6);
  pop()

  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(25);
  fill('#887b86');
  push()
  fill('#D6D1D3');
  text('ULTIMI 5 PRECEDENTI', width/2,height/7*1);
  pop()
  text('MEDIA GOL', width/2,height/7*1.5);
  text('PROBABILITÀ VITTORIA', width/2,height/7*5);
  text(pvTM1R + "%", width/12*1.5,height/7*6);
  text(pvTM2 + "%", width/12*10.5,height/7*6);
  pop()

  push()
  rectMode(CORNER);
  fill('rgba(214,209,211,0.25)');
  noStroke();
  rect(width/12,height/7*2+15,sliderWidth,10,10);
  rect(width/12,height/7*3+15,sliderWidth,5,5);
  pop()

  push()
  rectMode(CORNER);
  ellipseMode(CENTER);
  fill('#887b86');
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(25);
  noStroke();
  if (mgTM1>mgTM2) {
    rect(width/12,height/7*2+15,sliderWidth/2,10,10);
    ellipse(width/12,height/7*2.2,height/20);
    push()
    fill('#f9f9f8')
    text(mgTM1,width/12,height/7*2.28);
    pop()
  } else {
    rect((width/12)+(sliderWidth/2-(sliderWidth/2/(nullmgTM2)*(nullmgTM1))),height/7*2+15,sliderWidth/2/(nullmgTM2)*(nullmgTM1),10,10);
    ellipse((width/12)+(sliderWidth/2-(sliderWidth/2/(nullmgTM2)*(nullmgTM1))),height/7*2.2,height/20)
    push()
    fill('#f9f9f8')
    text(mgTM1,(width/12)+(sliderWidth/2-(sliderWidth/2/(nullmgTM2)*(nullmgTM1))),height/7*2.28);
    pop()
  }
  if (golTM1>golTM2) {
    rect(width/12,height/7*3+15,sliderWidth/2,5,5);
  } else if(golTM1!==0){
    rect((width/12)+(sliderWidth/2-(sliderWidth/2/(nullgolTM2)*(nullgolTM1))),height/7*3+15,sliderWidth/2/(nullgolTM2)*(nullgolTM1),5,5);
  }
  rect(width/12,height/7*6+15,sliderWidth/(pvTM1+pvTM2)*(pvTM1),10,10);

  pop()

  push()
  rectMode(CORNER);
  fill('#D6D1D3');
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(25);
  noStroke();
  if (mgTM2>mgTM1) {
    rect((width/12)+(sliderWidth/2),height/7*2+15,sliderWidth/2,10,10);
    ellipse(width/2+(sliderWidth/2),height/7*2.2,height/20);
    push()
    fill('#f9f9f8')
    text(mgTM2,width/2+sliderWidth/2,height/7*2.28);
    pop()
  } else {
    rect((width/12)+sliderWidth/2,height/7*2+15,sliderWidth/2/(nullmgTM1)*(nullmgTM2),10,10);
    ellipse((width/2)+(sliderWidth/2/(nullmgTM1)*(nullmgTM2)),height/7*2.2,height/20)
    push()
    fill('#f9f9f8')
    text(mgTM2,(width/2)+(sliderWidth/2/(nullmgTM1)*(nullmgTM2)),height/7*2.28);
    pop()
  }
  if (golTM2>golTM1) {
    rect((width/12)+(sliderWidth/2),height/7*3+15,sliderWidth/2,5,5);
  } else if(golTM2!==0){
    rect((width/12)+sliderWidth/2,height/7*3+15,sliderWidth/2/(nullgolTM1)*(nullgolTM2),5,5);
  }
  rect((width/12*11)-(sliderWidth/(pvTM1+pvTM2)*(pvTM2)),height/7*6+15,sliderWidth/(pvTM1+pvTM2)*(pvTM2),10,10);
  pop()

  push()
  fill('#f9f9f8');
  noStroke()
  rectMode(CENTER)
  rect(width/2,height/12*5.5, width/15, height/20)
  pop()
  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text(golTM1+" : "+golTM2, width/2,height/12*5.5);
  pop()

  pvTM2 = 100-pvTM1R


  //update
  if (testo<8){
    golTM1 = 1;
  }
  if (testo<180&&testo>165) {
    if (pvTM1>70) {
      pvTM1-=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<165&&testo>153) {
    if (pvTM1<80) {
      pvTM1+=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<153&&testo>145) {
    if (pvTM1>70) {
      pvTM1-=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<145&&testo>141) {
    if (pvTM1<75) {
      pvTM1+=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<141&&testo>123) {
    if (pvTM1>60) {
      pvTM1-=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<123&&testo>104) {
    if (pvTM1<75) {
      pvTM1+=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<104&&testo>84) {
    if (pvTM1>65) {
      pvTM1-=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<84&&testo>36) {
    if (pvTM1<85) {
      pvTM1+=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<36&&testo>23) {
    if (pvTM1>80) {
      pvTM1-=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<23&&testo>9) {
    if (pvTM1<90) {
      pvTM1+=0.03;
      pvTM1R=round(pvTM1)
    }
  } else if (testo<9&&testo>0) {
    if (pvTM1<100) {
      pvTM1+=0.03;
      pvTM1R=round(pvTM1)
    }
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
