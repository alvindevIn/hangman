//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

let options = {
  profesi: [
    "dokter",
    "perawat",
    "guru",
    "polisi",
    "pemadam kebakaran",
    "tentara",
    "pilot",
    "pramugari",
    "pengacara",
    "hakim",
    "arsitek",
    "insinyur",
    "akuntan",
    "bankir",
    "penulis",
    "jurnalis",
    "fotografer",
    "koki",
    "pelayan",
    "mekanik",
    "tukang kayu",
    "desainer grafis",
    "programmer",
    "manajer",
    "pengusaha",
    "kasir",
    "peneliti",
    "psikolog",
    "seniman",
    "aktor",
    "musisi",
    "penyanyi",
    "penari",
    "atlet",
    "pelatih",
    "penata rambut",
    "penata rias",
    "model",
    "apoteker",
    "dokter gigi",
    "veterinarian",
    "perancang busana",
    "penerjemah",
    "penyiar radio",
    "host televisi",
    "produser film",
    "sutradara",
    "pemain teater",
    "penulis naskah",
    "ahli IT",
    "editor",
    "kepala sekolah",
    "pengelola toko",
    "pengemudi taksi",
    "sopir bus",
    "montir",
    "operator mesin",
    "tukang listrik",
    "plumber",
    "tukang batu",
    "tukang kebun",
    "penjaga keamanan"
  ],  
  provinsi: [
    "Aceh",
    "Sumatera Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Riau",
    "Jambi",
    "Bengkulu",
    "Lampung",
    "Kepulauan Bangka Belitung",
    "Kepulauan Riau",
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "DI Yogyakarta",
    "Jawa Timur",
    "Banten",
    "Bali",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Kalimantan",
    "Gorontalo",
    "Sulawesi",
    "Maluku",
    "Papua",
  ],
  negara: [
    "Indonesia",
    "Jerman",
    "Prancis",
    "Italia",
    "Spanyol",
    "Argentina",
    "Brasil",
    "Kanada",
    "Australia",
    "Jepang",
    "Korea Selatan",
    "Thailand",
    "Vietnam",
    "Malaysia",
    "Singapura",
    "Filipina",
    "Kamboja",
    "Laos",
    "Myanmar",
    "Bangladesh",
    "Pakistan",
    "Afghanistan",
    "Iraq",
    "Iran",
    "Mesir",
    "Nigeria",
    "Kenya",
    "Ethiopia",
    "Maroko",
    "Aljazair",
  ],
  kendaraan: [
    "mobil",
      "motor",
      "sepeda",
      "bus",
      "kereta api",
      "pesawat",
      "kapal",
      "perahu",
      "truk",
      "becak",
      "taksi",
      "ambulans",
      "pemadam kebakaran",
      "helikopter",
      "skateboard",
      "vespa",
      "sepeda motor",
      "traktor"
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
          dashes[index].innerText = "-";
          dashes[index].style.opacity = "0"; // Add this line to set opacity to 0
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

