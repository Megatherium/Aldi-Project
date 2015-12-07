/* dreckige Globals, muss man schauen was man mit macht*/


 alleRegale = [];
 regalCounter = 1;
time = 12; // Platzhalter, Tikcer muss noch implementiert werden
SEC = 1000 // literal für 1000ms
simSpeed = 1 // Divisor, 1 = Echtzeit
run = true;
clicks = 0;

function setup(){ //
  //var util = new UtilityClass();
  //var kunde1 = new Kunde();
  supi1 = new Supermarkt(60,40);

}
/*function go(){
while(run){
  window.setTimeout(main, (SEC/simSpeed));
}
}*/

function go(){
  simSpeed = $('#speed')[0].value;
  if(run) setTimeout(go,(SEC/simSpeed));
  clicks++;
  $('#debug').html(clicks);
  supi1.drawStore();

}

function main(){
  clicks++;
  $('#debug').html(clicks);
  supi1.drawStore();
}



//alert(supi1.areaArr);
