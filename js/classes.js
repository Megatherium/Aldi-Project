/* dreckige Globals, muss man schauen was man mit macht*/


 alleRegale = [];
 regalCounter = 1;
time = 12; // Platzhalter, Tikcer muss noch implementiert werden


var Supermarkt = function(x,y){
  this.x = x;
  this.y = y;

  this.areaArr = this.createArray(x,y);

}

Supermarkt.prototype.createArray = function(x,y){
  var ret = [];
  for (var i = 0; i < y; i++){
    temp = []
    for(var j = 0; j < x; j++){
      temp.push("");
    }
    ret.push(temp);
  }
  return ret;
}

/*instantiiert ein Rechteck an Regalen von a,b bis x,y*/
Supermarkt.prototype.setShelf = function(a,b,x,y){
  for (var i = b; i <= y; i++){
    for (var j = a; j <= x; j++){
      //alert('in');
      this.areaArr[j][i] = new Regal();
    }
  }
}

var Regal = function(){
  this.name = 'regal'+regalCounter;
  this.desc = "Regal";
  this.itemVolume = 0.04;
  this.Volume = 1; //Platzhalter, muss von DB abgerufen werden
  this.maxItems = Math.floor(this.Volume/this.itemVolume);
  this.currItems = this.setStartItems();
  alleRegale.push(this);
  regalCounter++;
}

Regal.prototype.setStartItems = function(){
  return this.maxItems;
}
var Kunde = function(){
  this.entryTime = util.getTime();
}

var UtilityClass = function(){ //noch nicht klar ob benötigt
  this.getTime = function(){
    return time;
  }
  //this.createArray =
}

function drawStore(supermarket){ //temporäre Lösung um überhaupt irgendwas zu sehen
  //alert('drawStore');
   //ladendiv = document.getElementById('Laden');
   pushTable = '<table>';
  for(var i = 0; i < supermarket.y; i++){
    pushTable += '<tr>';
    for(var j = 0; j < supermarket.x; j++){
      pushTable += '<td>';
      if(supermarket.areaArr[j][i] instanceof Regal) pushTable += 'R';
      else pushTable += 'X';
      pushTable += '</td>';

    }
    pushTable += '</tr>';
  }
  pushTable += '</table>'
  $('#Laden')[0].innerHTML = pushTable;
}

//Testinstaziierung

var util = new UtilityClass();
var kunde1 = new Kunde();
var supi1 = new Supermarkt(4,7);
//alert(supi1.areaArr);
