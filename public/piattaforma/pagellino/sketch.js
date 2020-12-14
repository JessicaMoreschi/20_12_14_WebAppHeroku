let b1, b2, button_text, valutazione, bordo;
let w, h, s, xBarra, logor, daspoIcon;
let i = 0;
let h1, h2;
let p_s, p_t, p_e, p_c; //percentuali
let daspo = 0;

//////////////////////////////////////////////////////

function preload() {
  logor = loadImage("./assets/logopiccolo.png"); //logo ridotto
  pagellino = loadImage("./assets/pagellino.png");
  bordo = loadImage("./assets/esterno.png");
  daspoIcon = loadImage("./assets/daspoImg.png");
}

///////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta
  h1 = 'Ecco il tuo';
  h2 = 'pagellino da tifoso';
}

/////////////////////////////////////////////////////

function draw() {
  background('#F9F9F9'); //chiaro
  //CONTATORE i DEL TEMPO
  if (frameCount % 15 == 0) { //multiplo di 50 incrementa i
    i++;
  }

  w = width / 20;
  h = height / 50;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //logo a destra
  image(logor, w * 18.5, h * 6, logor.width / 4.5, logor.height / 4.5);
      //testo titolo
      push();
      fill('#877B85'); //4° colore PALETTE
      textSize(25);
      text(h1, w * 10, h * 13);
      fill('#B7AEB5'); //3° PALETTE
      text(h2, w * 10, h * 15);
      textSize(15);
      text('IL VERO TIFO',  w * 10, h * 39);
      pop();

//pagellino
imageMode(CORNER)
      image(pagellino, w * 8, h * 23, pagellino.width / 1.4, pagellino.height / 1.4);
      imageMode(CENTER)
      image(bordo, w *10 , h * 28, bordo.width / 1.3, bordo.height / 1.3);

  button_text = 'Home';

  b1 = createButton(button_text);
  b1.position(w * 9, h * 42);
  b1.mousePressed(p);
  b1.id('startBtn');

  b2 = createButton("");
  b2.position(w, h * 4.5);
  b2.mousePressed(back);
  b2.id('pauseBtn')

  ///  coordinazioni
p_s= 25;
p_t= 70;
p_e= 21;
p_c= 52;

  push();

  fill('#877B85'); //4° colore PALETTE
  textSize(16);
  text(valutazione,  w * 8.6, h * 31.5);
  textAlign(LEFT, TOP);
  textSize(10);
  text('SCIARPATA',  w * 10, h * 24);
  text('TROMBETTA',  w * 10, h * 26.2);
  text('ESULTAZIONI',  w * 10, h * 28.4);
  text('COORDINAZIONE',  w * 10, h * 32);
  textSize(8);
    text(p_s + '%',  w * 12.1, h * 24.7);
    text(p_t + '%',  w * 12.1, h * 27.1);
    text(p_e + '%',  w * 12.1, h * 29.3);
    text(p_c + '%',  w * 12.1, h * 33.2);
  pop();

///////////////////////// barre

//BARRA SCIARPATA
    fill('#D5D0D3'); //barra grigia
    rectMode(CENTER);
    noStroke();
    rect(w * 11, h * 25.2, w*2, 6, 20);
    //xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
    xBarra = ((w*2) / 100) * p_s;
    push();
    rectMode(CORNER);
    fill('#877B85'); //barra viola
    //width/7 è la metà della barra, che è lunga width/3.5
    rect(w * 11 - w, h * 25.2 - 3, xBarra, 6, 20);
    pop();

    //BARRA TROMBETTA
        fill('#D5D0D3'); //barra grigia
        rectMode(CENTER);
        noStroke();
        rect(w * 11, h * 27.4, w*2, 6, p_t);
        //xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
        xBarra = ((w*2) / 100) * 70; //25%
        push();
        rectMode(CORNER);
        fill('#877B85'); //barra viola
        //width/7 è la metà della barra, che è lunga width/3.5
        rect(w * 11 - w, h * 27.4 - 3, xBarra, 6, p_e);
        pop();

    //BARRA esultazione
        fill('#D5D0D3'); //barra grigia
        rectMode(CENTER);
        noStroke();
        rect(w * 11, h * 29.6, w*2, 6, 20);
        //xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
        xBarra = ((w*2) / 100) * p_c; //
        push();
        rectMode(CORNER);
        fill('#877B85'); //barra viola
        //width/7 è la metà della barra, che è lunga width/3.5
        rect(w * 11 - w, h * 29.6 - 3, xBarra, 6, 20);
        pop();

        //BARRA COORDINAZIONE
            fill('#D5D0D3'); //barra grigia
            rectMode(CENTER);
            noStroke();
            rect(w * 11, h * 33.5, w*2, 6, 20);
            //xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
            xBarra = ((w*2) / 100) * 52; //
            push();
            rectMode(CORNER);
            fill('#877B85'); //barra viola
            //width/7 è la metà della barra, che è lunga width/3.5
            rect(w * 11 - w, h * 33.5 - 3, xBarra, 6, 20);
            pop();

      if( daspo == 0){
        valutazione = 'Tifo CURATO';
      } else if (daspo == 1) {
        valutazione = 'Tifo ROZZO';
        push();
        fill(249,249, 248, 225)
        rect(w * 11.3, h * 28, w*2.7, h*13) //rect(x,y,w,h,[tl],[tr],[br],[bl])
        //daspo icon
        image(daspoIcon, w * 11.2, h * 28.7, daspoIcon.width / 1.3, daspoIcon.height / 1.3);
        pop();
      }

}
//////////////////////////////////////////////////////////////////////////////////////////////////


function p() {
  window.open('../indexPausa.html', '_self');
}

function back() {
  window.open('../indexPausa.html', '_self');
}

 function mousePressed(){
   if (daspo == 0) {
     daspo = 1;
   } else if (daspo == 1) {
     daspo = 0;
   }
 }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
