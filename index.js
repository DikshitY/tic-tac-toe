let boxes = document.querySelectorAll(".box");
let newGameBtn = document.getElementById("new-game-btn");
let resetBtn = document.getElementById("reset-btn");
let winner = document.querySelector(".winner-container");
let winnerMessage = document.getElementById("winner-message");

let playerO = true;
let count = 0;

const setNewGame = () => {
  enableBoxes();
  for (let box of boxes) {
    box.innerText = "";
  }
  playerO = true;
  winner.classList.add("hide");
  count = 0
};

const updateWinner = (player) => {
  winnerMessage.innerHTML = `<solid>The winner is <span class="player">${player}</span></solid>`;
  winner.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  }
};

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (playerO) {
      box.innerText = "O";
      box.style.color = "black"
      playerO = false;
    } else {
      box.innerText = "X";
      box.style.color = "red"
      playerO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWin();
    if (count === 9 && !isWinner) {
      checkDraw();
    }
  });
});

const checkWin = () => {
  for (let pattern of winPatterns) {
    let value1 = boxes[pattern[0]].innerText;
    let value2 = boxes[pattern[1]].innerText;
    let value3 = boxes[pattern[2]].innerText;

    if (value1 != "" && value2 != "" && value3 != "") {
      if (value1 === value2 && value2 === value3) {
        updateWinner(value1);
        return true;
      }
    }
  }
};

const checkDraw = () => {
  winnerMessage.innerHTML = "Game was a Draw.";
  winner.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", setNewGame);
resetBtn.addEventListener("click", setNewGame);
