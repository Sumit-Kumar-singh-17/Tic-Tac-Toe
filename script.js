const turn_array = ["O", "X"];
const player = [1, 2];
let player_turn = player[Math.floor(Math.random() * 2)];
let turn = turn_array[Math.floor(Math.random() * 2)];
document.getElementById("currentPlayer").textContent = "Player " + player_turn;
let winner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let total_term = 0;
let board_array = new Array(9).fill("E");

function checkWinner() {
  for (const i of winner) {
    if (
      board_array[i[0]] != "E" &&
      board_array[i[0]] === board_array[i[1]] &&
      board_array[i[1]] === board_array[i[2]] &&
      board_array[i[0]] !== "E"
    ) {
      return 1;
    }
  }
  return 0;
}

const addEvent = (e) => {
  if (e.target.textContent === "") {
    total_term++;
    if (turn === "O") {
      e.target.classList.add("O");
      e.target.textContent = "O";
      console.log(e.target);
      board_array[e.target.id] = "O";
      if (checkWinner()) {
        document.getElementById("winningMessage").textContent =
          "Player " + player_turn + " is the winner";
        board.removeEventListener("click", addEvent);
        return;
      }
      turn = "X";
      player_turn = 2;
    } else {
      e.target.textContent = "X";
      e.target.classList.add("X");
      board_array[e.target.id] = "X";
      if (checkWinner()) {
        document.getElementById("winningMessage").textContent =
          "Player " + player_turn + " is the winner";
        board.removeEventListener("click", addEvent);
        return;
      }
      turn = "O";
      player_turn = 1;
    }
    document.getElementById("currentPlayer").textContent =
      "Player " + player_turn;
    updatePlayerImage();
    if (total_term === 9) {
      document.getElementById("winningMessage").textContent = "Match Draw";
    }
  }
};

const board = document.querySelector(".board");
board.addEventListener("click", addEvent);

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  board_array = new Array(9).fill("E");
  total_term = 0;
  turn = turn_array[Math.floor(Math.random() * 2)];
  player_turn = player[Math.floor(Math.random() * 2)];
  document.getElementById("currentPlayer").textContent =
    "Player " + player_turn;
  document.getElementById("winningMessage").textContent = "";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  board.addEventListener("click", addEvent);
  updatePlayerImage();
});

function updatePlayerImage() {
  if (player_turn === 1) {
    document.querySelector(".img1").style.transform = "scale(1.2)";
    document.querySelector(".img2").style.transform = "scale(1)";
  } else {
    document.querySelector(".img2").style.transform = "scale(1.1)";
    document.querySelector(".img1").style.transform = "scale(1)";
  }
}

// Initial call to set the correct image scaling
updatePlayerImage();