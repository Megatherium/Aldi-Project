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
