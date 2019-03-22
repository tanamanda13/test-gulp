var getRandomColor = ()=> {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// var setRandomColor = ()=>{
  
//   document.querySelector('.btn').addEventListener('click', function(){
//     document.querySelector('.colorpad').style.backgroundColor = getRandomColor;
//   })
// }

// setRandomColor();

var setRandomColor = ()=>{
  
  document.querySelector('.btn').addEventListener('click', ()=>{
    document.querySelector('.colorpad').style.backgroundColor = getRandomColor();
  })
}

setRandomColor();

// var setRandomColor = ()=>{
//     document.querySelector('.colorpad').style.backgroudColor = getRandomColor;
// }