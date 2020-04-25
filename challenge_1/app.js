const places = document.querySelectorAll('td');
var player = 'X';
var otherPlayer = 'O';
var turn = true;
var btn = document.querySelector('button');

var firstCol = document.querySelectorAll('.first');
var secondCol = document.querySelectorAll('.second');
var thirdCol = document.querySelectorAll('.third');

var firstRow = document.querySelectorAll('#firstRow td');
var secondRow = document.querySelectorAll('#secondRow td');
var thirdRow = document.querySelectorAll('#thirdRow td');

//left bottom --> right top
var minorDiag = document.querySelectorAll('.minor');
//left top --> right bottom
var majorDiag = document.querySelectorAll('.major');

var lists = [
  firstCol,
  secondCol,
  thirdCol,
  firstRow,
  secondRow,
  thirdRow,
  minorDiag,
  majorDiag
];

var isTaken = (place) => {
  if (place.textContent === 'X' || place.textContent == 'O') {
    return true;
  }
  return false;
};

var checkForWin = () => {
  return lists.some( list => {
    if (list[0].textContent === list[1].textContent && list[1].textContent === list[2].textContent && isTaken(list[0])) {
      return true;
    }
  });
};

var checkForTie = () => {
  var lists = [firstCol, secondCol, thirdCol];
  //can't use every method for nodeLists
  var isTie =  lists.every( list => isTaken(list[0]) && isTaken(list[1]) && isTaken(list[2]));
  return isTie;
};

var play = (place) => {
  if (isTaken(place)) {
    alert('Place is taken!');
    return;
  }
  if (turn) {
    place.textContent = player;
  } else {
    place.textContent = otherPlayer;
  }
  turn = !turn;
  if (checkForWin()) {
    stopGame(place);
    alert(`${place.textContent} won!`);
  } else if (checkForTie()) {
    console.log(checkForTie());
    stopGame(place);
    alert('There has been a tie!');
  }
};


var clickEventHandler = (event) => {
  play(event.target);
};


places.forEach( place => {
  place.addEventListener('click', clickEventHandler);
});

var stopGame = () => {
  places.forEach( place => {
    place.removeEventListener('click', clickEventHandler);
  });
};

btn.addEventListener('click', () => {
  places.forEach( place => {
    place.textContent = undefined;
    place.addEventListener('click', clickEventHandler);
  });
  turn = true;
});