function cutnsplice(x,y,arr){
  var snip = arr.findIndex(function(e,i,a){
    if (e.x == x && e.y == y) return true
        else return false
  })

  if (snip == 0){
    return arr.slice(1);
  }
  else if (snip == (arr.length - 1)) {
     return arr.slice(0,-1);
  }
  else if (snip == -1){
    return false
  }
  else {
    return arr.slice(0,snip).concat(arr.slice((snip+1)))
      }
}

drawStore = function(bork){ //temporäre Lösung um überhaupt irgendwas zu sehen, alle Regale sind O, alles leere X, Regale kriegen eine r### ID
  pushTable = '<table>';
  for(var i = 0; i < bork.area.length; i++){
    pushTable += '<tr>';
    for(var j = 0; j < bork.area[0].length; j++){
      if (typeof bork.area[i][j].shelf == 'object'){
        //pushTable += '<td id="r'+area[i][j].shelf.number+'">';
       pushTable += '<td id=\'r'+bork.area[i][j].shelf.number+'\'>O';
     }

      else pushTable += '<td>X';


      pushTable += '</td>';

    }
    pushTable += '</tr>';

  }
  pushTable += '</table>'
  $('#Laden').html(pushTable)// = pushTable;
}

function colorAll(){ //färbt alle Felder
  shelfArray.forEach(function(e){
    e.setBG();
  })
}

function minus(x){ //reduziert den Bestand im Regal um x
  shelfArray.forEach(function(e){
    if (e.currItems >= e.maxItems && x < 0) e.currItems = e.maxItems;
    else if (e.currItems <= 0 && x > 0) e.currItems = 0;
    else e.currItems -= x;
  })
}

function oneClick(){
  supi = new Supermarkt(60,40);
  supi.setup();
  drawStore(supi);
  colorAll();
}
