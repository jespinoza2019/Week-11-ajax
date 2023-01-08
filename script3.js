window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.box'));
  const playerDisplay = document.querySelector('.display-player');
  
  const resetButton = document.querySelector('#replay');
  const announcer = document.querySelector('.announcer');

  let board = ['', '', '', '', '', '', '', '', '', ]
  let currentPlayer = "X";
  let isGameActive = true;
  const playerX = "Player X Won";
  const playerO = "Player O Won";
  const draw = "Draw or Tie Game"
  /*
  [0] [1] [2]
  [3] [4] [5]
  [6] [7] [8]
  */
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
 ];
 function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    announce(currentPlayer === "X" ? playerX : playerO);
    isGameActive = false;
    return;
  }

  if (!board.includes("")) announce(draw);
}
  const announce = (type) => {
    switch(type){
      case playerO:
            announce.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
      case playerX:
            announce.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
      case draw:
            announce.innerText = 'Game is a Draw/Tie';
        }
    announcer.classList.remove('hide');
  };
  const isValidAction = (box) => {
    if (box.innerText === 'X' || box.innertext === 'O'){
      return false;
    }
    return true;
  }
  const updateBoard = (index) => {
    board[index] = currentPlayer;
  }

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}
  const userAction = (box, index) => {
    if (isValidAction(box) && isGameActive) {
      box.innerText = currentPlayer;
      box.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };
  const resetBoard = () => {
    board = ['','','','','','','','', ];
    isGameActive = true;
    announce.classlist.add('hide');
    if(currentPlayer === 'O'){
      changePlayer();
    }
    tiles.forEach(box =>{
      box.innerText = '';
      box.classlist.remove('playerX');
      box.classlist.remover('playerO');
    })

  }

  tiles.forEach( (box, index) => {
      box.addEventListener('click', () => userAction(box,index));
    });

  resetButton.addEventListener('click',resetBoard);
});

