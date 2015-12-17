tileCounter = 0;
shelfCounter = 0;
customerCounter = 0;
shelfArray = [];
customerArray = [];

SHELFSIZE = 1;

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

Supermarkt.prototype.getTile = function(x,y){
  return this.area[y][x];
};

Supermarkt.prototype.setup = function () {
  var anzWaren = warenliste.length;
  var ybound = this.y -3;
  var xbound = (this.x < regaleProReihe ? this.x : regaleProReihe);

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

var Tile = function(x,y){
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

Tile.prototype.spawnCustomer = function(){
  this.customers.push(new Customer(this.x,this.y))
};

Tile.prototype.despawnCustomer = function(n){
  // body...
};
var Shelf = function(x,y){
  this.x = x;
  this.y = y;
  this.number = shelfCounter++;
  this.volume = SHELFSIZE;
  this.setup(this.number);

  shelfArray.push(this);
}

Shelf.prototype.setup = function(x){


  this.price = warenliste[x][2]
  this.itemVolume = warenliste[x][1]
  this.maxItems = Math.floor(this.volume/this.itemVolume);
  this.currItems = this.maxItems;

};

var Customer = function(x,y){
  this.x = x;
  this.y = y;
  this.number = customerCounter++;
  this.zettel = new Zettel();
  this.entryTime = timer;

  customerArray.push(this);

}

Customer.prototype.timeInStore = function () {
  return (timer - this.entryTime)
};

var Zettel = function(){

}
