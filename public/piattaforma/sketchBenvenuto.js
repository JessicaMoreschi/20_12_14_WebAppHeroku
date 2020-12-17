let logoIcon, benvenuto;
let pag = 0;
let button;

/////////////////////////////////////////////////////////////////////////

function preload() {
  logoIcon = loadImage("./assets/immagini/logo.png");
}
/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}

/////////////////////////////////////////////////////////////////////////
function mouseClicked() {
  window.open('codice_partita/index.html', '_self');

}
/////////////////////////////////////////////////////////////////////

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('#887b86'); //scuro
  imageMode(CENTER); //per pittogrammi
  image(logoIcon, width / 2, height / 2, logoIcon.width / 7, logoIcon.height / 7);
}
