// Server
let socket = io(); //setting server

//Coundown
let testo; //valore countdown
let ppTM1R=50;

let datipartitaImg;
let sliderWidth;
let ppTM1 = 50;
let ppTM2 = 100-ppTM1R;
let attTM1= ppTM1R;
let attTM2= 100-attTM1;
let prTM1 = 0;
let prTM2 = 0;
let corTM1 = 0;
let corTM2 = 0;
let ttTM1 = 0;
let ttTM2 = 0;
let golTM1 = 0;
let golTM2 = 0;

let nullprTM1 = prTM1;
let nullprTM2 = prTM2;
let nullcorTM1 = corTM1;
let nullcorTM2 = corTM2;
let nullttTM1 = ttTM1;
let nullttTM2 = ttTM2;
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


  ppTM2 = 100-ppTM1R;
  attTM1= ppTM1R;
  attTM2= 100-attTM1;

  if (prTM1 == 0) {
    nullprTM1 = 0.001
  } else {
    nullprTM1 = prTM1
  };
  if (prTM2 == 0) {
    nullprTM2 = 0.001
  } else {
    nullprTM2 = prTM2
  };
  if (corTM1 == 0) {
    nullcorTM1 = 0.001
  } else {
    nullcorTM1 = corTM1
  };
  if (corTM2 == 0) {
    nullcorTM2 = 0.001
  } else {
    nullcorTM2 = corTM2
  };
  if (ttTM1 == 0) {
    nullttTM1 = 0.001
  }else {
    nullttTM1 = ttTM1
  };
  if (ttTM2 == 0) {
    nullttTM2 = 0.001
  }else {
    nullttTM2 = ttTM2
  };
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

  //update
  if (testo<180&&testo>165) {
    if (ppTM1>0) {
      ppTM1-=0.03;
      ppTM1R=round(ppTM1)
    }
  } else if (testo<165&&testo>153) {
    if (ppTM1<30) {
      ppTM1+=0.03;
      ppTM1R=round(ppTM1);
    } if (prTM1<1) {
      prTM1++
    }
  } else if (testo<153&&testo>145) {
    if (ppTM1>20) {
      ppTM1-=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM2<1) {
      prTM2++
    }
  } else if (testo<145&&testo>141) {
    if (ppTM1<25) {
      ppTM1+=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM1<2) {
      prTM1++
    }
  } else if (testo<141&&testo>123) {
    if (ppTM1>10) {
      ppTM1-=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM2<2) {
      prTM2++
    }
  } else if (testo<123&&testo>104) {
    if (ppTM1<30) {
      ppTM1+=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM1<3) {
      prTM1++
    }
  } else if (testo<104&&testo>84) {
    if (ppTM1>20) {
      ppTM1-=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM2<3) {
      prTM2++
    }
  } else if (testo<84&&testo>36) {
    if (ppTM1<40) {
      ppTM1+=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM1<4) {
      prTM1++
    }
  } else if (testo<36&&testo>23) {
    if (ppTM1>35) {
      ppTM1-=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM2<4) {
      prTM2++
    }
  } else if (testo<23&&testo>9) {
    if (ppTM1<60) {
      ppTM1+=0.03;
      ppTM1R=round(ppTM1)
    }if (prTM1<5) {
      prTM1++
    }
  } else if (testo<9&&testo>0) {
    if (ppTM1<57) {
      ppTM1+=0.03;
      ppTM1R=round(pvTM1)
    }if (prTM2<5) {
      prTM2++
    }
  }

  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(20);
  fill('#887b86');
  text('TM1', width/12*2,height/7*1);
  text('TM1', width/12*2,height/7*2);
  text('TM1', width/12*2,height/7*3);
  text('TM1', width/12*2,height/7*4);
  text('TM1', width/12*2,height/7*5);
  text('TM1', width/12*2,height/7*6);
  text('TM2', width/12*10,height/7*1);
  text('TM2', width/12*10,height/7*2);
  text('TM2', width/12*10,height/7*3);
  text('TM2', width/12*10,height/7*4);
  text('TM2', width/12*10,height/7*5);
  text('TM2', width/12*10,height/7*6);
  pop()

  push();
  textFont('Quicksand', BOLD);
  textAlign(CENTER);
  textSize(25);
  fill('#887b86');

  text('POSSESSO PALLA', width/2,height/7*1);
  text('ATTACCO', width/2,height/7*2);
  text('PALLA RECUPERATA', width/2,height/7*3);
  text('CORNER', width/2,height/7*4);
  text('TIRI TOTALI', width/2,height/7*5);
  text('GOAL', width/2,height/7*6);

  text(ppTM1R + "%", width/12*1.5,height/7*1);
  text(ppTM2 + "%", width/12*10.5,height/7*1);
  text(attTM1 + "%", width/12*1.5,height/7*2);
  text(attTM2 + "%", width/12*10.5,height/7*2);
  text(prTM1, width/12*1.5,height/7*3);
  text(prTM2, width/12*10.5,height/7*3);
  text(corTM1, width/12*1.5,height/7*4);
  text(corTM2, width/12*10.5,height/7*4);
  text(ttTM1, width/12*1.5,height/7*5);
  text(ttTM2, width/12*10.5,height/7*5);
  text(golTM1, width/12*1.5,height/7*6);
  text(golTM2, width/12*10.5,height/7*6);
  pop()

  push()
  rectMode(CORNER);
  fill('#887b86');
  noStroke();
  rect(width/12,height/7*1+15,sliderWidth/(100/ppTM1),10,10);
  rect(width/12,height/7*2+15,sliderWidth/(100/attTM1),10,10);
  rect(width/12,height/7*3+15,sliderWidth/(nullprTM1+nullprTM2)*(nullprTM1),10,10);
  rect(width/12,height/7*4+15,sliderWidth/(nullcorTM1+nullcorTM2)*(nullcorTM1),10,10);
  rect(width/12,height/7*5+15,sliderWidth/(nullttTM1+nullttTM2)*(nullttTM1),10,10);
  rect(width/12,height/7*6+15,sliderWidth/(nullgolTM1+nullgolTM2)*(nullgolTM1),10,10);
  pop()

  push()
  rectMode(CORNER);
  fill('#D6D1D3');
  noStroke();
  rect((width/12*11)-(sliderWidth/(100/ppTM2)),height/7*1+15,sliderWidth/(100/ppTM2),10,10);
  rect((width/12*11)-(sliderWidth/(100/attTM2)),height/7*2+15,sliderWidth/(100/attTM2),10,10);
  rect((width/12*11)-(sliderWidth/(nullprTM1+nullprTM2)*(nullprTM2)),height/7*3+15,sliderWidth/(nullprTM1+nullprTM2)*(nullprTM2),10,10);
  rect((width/12*11)-(sliderWidth/(nullcorTM1+nullcorTM2)*(nullcorTM2)),height/7*4+15,sliderWidth/(nullcorTM1+nullcorTM2)*(nullcorTM2),10,10);
  rect((width/12*11)-(sliderWidth/(nullttTM1+nullttTM2)*(nullttTM2)),height/7*5+15,sliderWidth/(nullttTM1+nullttTM2)*(nullttTM2),10,10);
  rect((width/12*11)-(sliderWidth/(nullgolTM1+nullgolTM2)*(nullgolTM2)),height/7*6+15,sliderWidth/(nullgolTM1+nullgolTM2)*(nullgolTM2),10,10);
  pop()

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
