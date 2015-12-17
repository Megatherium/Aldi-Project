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

artArr1 = "";
artikel = "";
function go(){
  simSpeed = $('#speed')[0].value;
  if(run) setTimeout(go,(SEC/simSpeed));
  clicks++;
  //$('#debug').html(clicks);
  //artikel = $.ajax("http://localhost/Aldi-Project/php/artikel.php")
  artikel = $.ajax("./js/material");
  //artikel.done(function(x){alert(x);});
  //artArr1 = artikel.responseText.split("\r\n");
  //artikel.responseText
  artikel.done(function(jes){artArr = JSON.parse(jes)});
  supi1.drawStore();

}

function main(){
  clicks++;
  $('#debug').html(clicks);
  supi1.drawStore();
}


warenliste.forEach(function(e,i,a){ //wandelt gepaddeten artnr String in int um
  e[0] = parseInt(e[0]);
})
//alert(supi1.areaArr);
