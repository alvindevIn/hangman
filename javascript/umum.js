//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
  buah: [
    "apel",
    "jeruk",
    "belimbing",
    "nanas",
    "semangka",
    "durian",
    "pisang",
    "anggur",
    "mangga",
    "stroberi",
    "kiwi",
    "melon",
    "pepaya",
    "rambutan",
    "sirsak",
    "ceri",
    "kiwi",
    "alpukat",
    "markisa",
    "leci",
    "nangka",
    "salak",
  ],  
  hewan: [
    "anjing",
    "beruang",
    "kancil",
    "buaya",
    "gajah",
    "kudanil",
    "jerapah",
    "singa",
    "harimau",
    "zebra",
    "kuda",
    "kucing",
    "koala",
    "kanguru",
    "elang",
    "kepiting",
    "ular",
    "monyet",
    "katak",
    "sapi",
    "kambing",
    "domba",
    "cacing",
    "landak"
  ],
  sayur: [
    "bayam",
    "wortel",
    "kentang",
    "tomat",
    "terong",
    "buncis",
    "sawi",
    "kubis",
    "mentimun",
    "labu",
    "sawi",
    "kacang",
    "brokoli",
    "paprika",
    "kembang kol",
    "selada",
    "daun bawang",
    "lobak",
    "bit",
    "seledri",
    "jagung",
    "ubi",
    "zucchini",
    "cabai",
    "kangkung",
    "pare",
    "bayam merah",
    "kailan",
    "jipang",
    "petai",
    "kecipir",
    "kelor",
    "kol bunga",
    "tauge",
    "bayam hijau",
    "jahe",
    "kunyit",
    "temulawak",
    "serai",
    "lengkuas"
  ]
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Pilih Salah Satu</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Kamu Menang!!</h2><p>kata yang benar yaitu <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else {
        //kalah
        count += 1;
        //fungsi gambar
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>yahh gagal!!</h2><p>kata yang benar <span>${chosenWord}, coba lagi yahh</span></p>`;
          blocker();
        }
      }
      //disable klik tombol
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  // Add space button
  let spaceButton = document.createElement("button");
  spaceButton.classList.add("letters", "space-button");
  spaceButton.innerText = "Spasi";
  spaceButton.addEventListener("click", () => {
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes");
    if (charArray.includes(" ")) {
      charArray.forEach((char, index) => {
        if (char === " ") {
          dashes[index].innerText = " ";
          winCount += 1;
          if (winCount == charArray.length) {
            resultText.innerHTML = `<h2 class='win-msg'>Kamu Menang!!</h2><p>kata yang benar yaitu <span>${chosenWord}</span></p>`;
            blocker();
          }
        }
      });
    }
    //disable klik tombol
    spaceButton.disabled = true;
  });
  letterContainer.append(spaceButton);

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;
window.onload = initializer;
window.onload = initializer;
