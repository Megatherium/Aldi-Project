tileCounter = 0;
shelfCounter = 0;
customerCounter = 0;
shelfArray = [];
customerArray = [];
timer = 12 // Dummyvariable
SHELFSIZE = 1;
MAXLISTITEMS = 12;

//Supermarkt enthält Array, dass alle Tiles enthält
var Supermarkt = function(x,y){
  this.x = x;
  this.y = y;

  this.area = this.createArray(x,y);

}

Supermarkt.prototype.createArray = function(x,y){
  var ret = [];
  for (var i = 0; i < y; i++){
    temp = []
    for(var j = 0; j < x; j++){
      temp.push(new Tile(j,i));
    }
    ret.push(temp);
  }
  return ret;
}

Supermarkt.prototype.getTile = function(x,y){ //gibt Kachel x,y zurück, bedingt bequemer als Supermarkt.area
  return this.area[y][x];
};

Supermarkt.prototype.setup = function () { //setzt regale in Doppelreihen
  var anzWaren = warenliste.length;
  var ybound = this.y -3;
  var xbound = (this.x < regaleProReihe ? (this.x - 1): regaleProReihe); // limitiert x-Richtung, wenn regaleProReihe größer als der Supermarkt ist

  outer:
  for (var q = 0; q < ybound; q += 3){
    inner:

    for (var r = 1; r <= xbound; r++){
      $('#debug').html("x: "+r+" y: "+q);
      if(shelfCounter < anzWaren) this.area[q][r].addShelf();
      if(shelfCounter < anzWaren) this.area[(q+2)][r].addShelf();
      else break inner;
    }

  }
};

var Tile = function(x,y){ // jede area-Koordinate ist ein Tile-Objekt, was einen generellen Container darstellt
  this.x = x;
  this.y = y;
  this.number = tileCounter++;
  this.customers = [];
}

Tile.prototype.addShelf = function(){
  this.shelf = new Shelf(this.x,this.y);
};

Tile.prototype.removeShelf = function(){
  delete this.shelf;
  shelfArray = cutnsplice(this.x,this.y,shelfArray)
  shelfCounter--;
};

Tile.prototype.spawnCustomer = function(){ //erzeugt Kunden in Tile.customers, Kunde wird durch eigenen Konstruktor in customerArray gepusht

  this.customers.push(new Customer(this.x,this.y));

};

Tile.prototype.despawnCustomer = function(n){
  var cus = this.customers[n];
  cutnsplice(cus.x,cus.y,customerArray,cus.number);
  cutnsplice(cus.x,cus.y,this.customers,cus.number);
  customerCounter--;
};

Tile.prototype.moveCustomer = function (toX,toY,num) {
  customerArray[(this.customers[num].number)].x = toX;
  customerArray[(this.customers[num].number)].y = toY;
  supi.getTile(toX,toY).customers.push(this.customers[num]);
  this.customers.splice(num);
};

var Shelf = function(x,y){
  this.x = x;
  this.y = y;
  this.number = shelfCounter++;
  this.volume = SHELFSIZE;
  if (arguments.length <= 2) this.isLager = false;
  else this.isLager = true;

  this.setup(this.number);

  shelfArray.push(this);
}

Shelf.prototype.setup = function(x){


  this.price = warenliste[x][2]
  this.itemVolume = warenliste[x][1]
  this.maxItems = Math.floor(this.volume/this.itemVolume);
  this.currItems = this.maxItems;


};

Shelf.prototype.setBG = function () { //setzt die Hintergrundfarbe des Regals, von rot bis grün
  var id = this.number
  var mix = this.currItems / this.maxItems;
  var col;
  if (mix == 0.5) col = 'rgb(255,255,0)';
  else if (mix < 0) col = 'rgb(255,0,0)';
  else if (mix < 0.5) col = 'rgb(255,'+Math.floor(255*(2*mix))+',0)';
  else col = 'rgb('+Math.floor((255-(255*mix)))+',255,0)';
  //alert(col);
  $('#r'+id).css('background-color',col)

};
var Customer = function(x,y){
  this.x = x;
  this.y = y;
  this.number = customerCounter++;
  this.list = createShoppingList();
  this.entryTime = timer;

  customerArray.push(this);

}

Customer.prototype.timeInStore = function () {
  return (timer - this.entryTime)
};


function createShoppingList(){ //liefert Array mit [artnr,anzahl] zurück
  var numItems = Math.ceil(Math.random()*MAXLISTITEMS);
  var items = [];
  for (var i = 0; i < numItems; i++){
    var loopArr = [];
    loopArr[0] = Math.floor(Math.random()*warenliste.length);
    loopArr[1] = Math.ceil(Math.random()*shelfArray[loopArr[0]].maxItems);
    items.push(loopArr);

  }
  return items.sort();
}
