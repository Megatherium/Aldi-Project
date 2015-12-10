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
  this.setup();

  shelfArray.push(this);
}

Shelf.prototype.setup = function(){
  /*
  this.price = aus DB oder DOM
  this.itemVolume = aus DB oder DOM
  this.maxItems = Math.floor(this.volume/this.itemVolume);
  this.currItems = this.maxItems;
  */
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
