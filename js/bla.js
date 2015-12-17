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

drawStore = function(bork){ //temporäre Lösung um überhaupt irgendwas zu sehen
  pushTable = '<table>';
  for(var i = 0; i < bork.area.length; i++){
    pushTable += '<tr>';
    for(var j = 0; j < bork.area[0].length; j++){
      pushTable += '<td>';
      if (typeof bork.area[i][j].shelf == 'object') pushTable += 'O';
      else pushTable += 'X';
      

      pushTable += '</td>';

    }
    pushTable += '</tr>';

  }
  pushTable += '</table>'
  $('#Laden').html(pushTable)// = pushTable;
}
