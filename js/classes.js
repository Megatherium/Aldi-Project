


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

Supermarkt.prototype.getTile = function(x,y){
  return this.areaArr[y][x];
};

/*instantiiert ein Rechteck an Regalen von a,b bis x,y*/
Supermarkt.prototype.rectShelf = function(a,b,x,y,z){
  for (var i = b; i <= y; i++){
    for (var j = a; j <= x; j++){
      //alert('in');
      this.areaArr[j][i] = new Regal(z);
    }
  }
};

Supermarkt.prototype.setShelf = function(x,y,z){
  this.areaArr[y][x] = new Regal(z);
};

Supermarkt.prototype.drawStore = function(){ //temporäre Lösung um überhaupt irgendwas zu sehen
  pushTable = '<table>';
  for(var i = 0; i < this.y; i++){
    pushTable += '<tr>';
    for(var j = 0; j < this.x; j++){
      pushTable += '<td>';
      switch(this.getTile(j,i).type){
        case ('Lager'):
         pushTable += 'L';
         break;
        case ('Verkauf'):
          pushTable += 'V';
          break;
        case ('Kasse'):
          pushTable += 'K';
          break;
        default:
          pushTable += 'X';
          break;
      }

      pushTable += '</td>';

    }
    pushTable += '</tr>';

  }
  pushTable += '</table>'
  $('#Laden').html(pushTable)// = pushTable;
}
var Regal = function(type){

  this.type = (type == 'Lager') ? 'Lager' : 'Verkauf';
  this.name = 'regal'+regalCounter; //kann nur sauber eingehalt werden durch eval
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
