/*
==========
Page Login
==========
*/
document.addEventListener("DOMContentLoaded", function () {
  const btnLogin = document.getElementById("button-login");
  const inputName = document.getElementById("input-name");
  const overlay = document.getElementById("loading-overlay");
  const startingPage = new Audio("./assets/sounds/startingPage.mp3");
  startingPage.volume = 0.5;


  if (btnLogin && inputName) {
    btnLogin.addEventListener("click", function (event) {
      event.preventDefault();
      
      overlay.classList.remove("hidden");

      startingPage.currentTime = 0;
      startingPage.play();

      const name = inputName.value.trim();

      startingPage.onended = () => {
        
      if (name !== "") {
        window.location.href = "home-screen.html?name=" + encodeURIComponent(name);
      } else {
        window.location.href = "home-screen.html";
      }
    }
    });
  }


/*
================
Page Home Screen
================
*/
  const url = window.location.pathname;
  const isHomeScreen = url.includes("home-screen.html");

  if (isHomeScreen) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    if (document.title === "Hello" || document.title === "") {

      if (name && name.trim() !== "") {
        document.title = "Hello, " + name;

      } else {
        document.title = "Hello, Earthling"; 
      }
    }
  }
});

/*
=======================================
Open and close functions with animation
=======================================
*/

let highestZIndex = 1; 

const openTabSound = new Audio("./assets/sounds/openTab.mp3");
openTabSound.volume = 0.5;

  document.querySelectorAll(".icon-app").forEach(icon => {
    icon.addEventListener("click", () => {
      openTabSound.currentTime = 0;
      openTabSound.play();
    });
  });

  document.getElementById("footer-button-windows").addEventListener("click", () => {
    openTabSound.currentTime = 0;
    openTabSound.play();
  });

  document.getElementById("footer-button-info").addEventListener("click", () => {
    openTabSound.currentTime = 0;
    openTabSound.play();
  });


function showTab(tabId) {
  
  openTabSound.currentTime = 0;
  openTabSound.play();
                                      
                                      
  const tab = document.getElementById(tabId);
  const baseName = tabId.replace("-tab", "");
  const footerTab = document.getElementById(`windows-tab-${baseName}`);

  if (tab) {
    tab.style.top = "50%";
    tab.style.left = "50%";
    tab.style.transform = "translate(-50%, -50%)";

    tab.classList.remove("hidden", "close");
    tab.classList.add("opening");

    highestZIndex++;
    tab.style.zIndex = highestZIndex;

    tab.addEventListener("animationend", () => {
      tab.classList.remove("opening");
    }, { once: true });
  }

  if (footerTab) {
     footerTab.style.bottom = "0";
    footerTab.style.left = "0";
    footerTab.style.right = "0";
    
    footerTab.classList.remove("hidden", "close");
    footerTab.classList.add("opening");

    highestZIndex++;
    footerTab.style.zIndex = highestZIndex;

    footerTab.addEventListener("animationend", () => {
      footerTab.classList.remove("opening");
    }, { once: true });
  }
}


const closeTabSound = new Audio("./assets/sounds/closeTab.mp3");
closeTabSound.volume = 0.5;

  document.querySelectorAll(".fa-xmark").forEach(icon => {
    icon.addEventListener("click", () => {
      closeTabSound.currentTime = 0;
      closeTabSound.play();
    });
  });


function closeTab(tabId) {

  closeTabSound.currentTime = 0;
  closeTabSound.play();

  const tab = document.getElementById(tabId);
  const baseName = tabId.replace("-tab", "");
  const footerTab = document.getElementById(`windows-tab-${baseName}`);

  if (tab) {
    tab.classList.add("closing");
    tab.addEventListener("animationend", () => {
      tab.classList.add("hidden");
      tab.classList.remove("closing");
    }, { once: true });
  }

  if (footerTab) {
    footerTab.classList.add("closing");
    footerTab.addEventListener("animationend", () => {
      footerTab.classList.add("hidden");
      footerTab.classList.remove("closing");
    }, { once: true });
  }
}

/*
============================
Opening flaps and baseboards
============================
*/

const icons = document.querySelectorAll('.icon-app');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const appId = icon.querySelector('img').id; 
    const tabId = appId.replace('icon-', '') + '-tab';
    showTab(tabId);


    const tab = document.getElementById(tabId);
    if (tab) {
      highestZIndex++;
      tab.style.zIndex = highestZIndex;
    }
  });
});

/*
=======================
Closing flaps and baseboards
=======================
*/

const closeButtons = document.querySelectorAll('.tab .fa-xmark');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.closest('.tab-popup');
    if (tab) {
      closeTab(tab.id); 
    }
  });
});


/*
=================
Draggable Windows
=================
*/

function makeDraggable(tabPopup) {
  const header = tabPopup.querySelector(".tab");
  let offsetX = 0, offsetY = 0;
  let isDragging = false;

  tabPopup.addEventListener("mousedown", () => {
    highestZIndex++;
    tabPopup.style.zIndex = highestZIndex;
  });

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = tabPopup.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    tabPopup.style.position = "absolute";
    highestZIndex++;
    tabPopup.style.zIndex = highestZIndex;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      tabPopup.style.left = `${e.clientX - offsetX}px`;
      tabPopup.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

document.querySelectorAll(".tab-popup").forEach(tab => {
  makeDraggable(tab);
});

/*
======================
Windows Menu Functions
======================
 */

function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
   
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");

    let month = (now.getMonth() + 1).toString().padStart(2, "0"); 
    let day = now.getDate().toString().padStart(2, "0");
    let year = now.getFullYear();

    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateString = `${month}/${day}/${year}`;

    clockElement.innerHTML = `${timeString}<br>${dateString}`;
}

updateClock();
setInterval(updateClock, 1000);

/* 
====
Game 
====
*/
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const gameOverScreen = document.getElementById("game-over-screen");
const restartButton = document.getElementById("restart-button");

const box = 20; 
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 9 * box }];
let food = { x: 0, y: 0 };
let direction = "RIGHT";
let score = 0;
let game;

function createFood() {
  food.x = Math.floor(Math.random() * (canvasSize / box)) * box;
  food.y = Math.floor(Math.random() * (canvasSize / box)) * box;
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "crimson" : "pink";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "lightBlue";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    createFood();
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvasSize ||
    snakeY >= canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    gameOverScreen.style.display = "flex";
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function startGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = "RIGHT";
  score = 0;
  createFood();
  gameOverScreen.style.display = "none";
  game = setInterval(draw, 100);
}

restartButton.addEventListener("click", startGame);

startGame();


/*
============
Windows Menu
============
*/

function toggleMenu(buttonId, menuId) {
  const btn = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);

  btn.addEventListener("click", ()=> {
    menu.classList.toggle("show");
  });
}


toggleMenu("footer-button-windows", "windows-menu");
toggleMenu("footer-button-info", "footer-windows-options");



const shutdownSound = new Audio("./assets/sounds/shutDown.mp3");
shutdownSound.volume = 0.6;

document.getElementById("btn-shutdown").addEventListener("click", () => {

  shutdownSound.currentTime = 0;
  shutdownSound.play();

  const overlay = document.getElementById("overlay-shutdown");
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "all";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000); 

});


const sleepSound = new Audio("./assets/sounds/sleep.mp3");
sleepSound.volume = .6;

const overlaySleep = document.getElementById("overlay-sleep");
const btnSleep = document.getElementById("btn-sleep");
const particlesContainer = document.getElementById("particles");

function createParticle() {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  particle.style.left = Math.random() * 100 + "vw";
  particle.style.top = Math.random() * 100 + "vh";
  particle.style.animationDuration = (3 + Math.random() * 3) + "s";

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 6000);
}

btnSleep.addEventListener("click", () => {
  sleepSound.currentTime = 0;
  sleepSound.play();

  overlaySleep.style.opacity = "1";
  overlaySleep.style.pointerEvents = "all";

  particleEngine = setInterval(createParticle, 350);

  document.addEventListener("mousemove", wakeUp);
  document.addEventListener("keydown", wakeUp);
});

function wakeUp() {
  overlaySleep.style.opacity = "0";
  overlaySleep.style.pointerEvents = "none";
  sleepSound.pause();
  clearInterval(particleEngine);

  document.removeEventListener("mousemove", wakeUp);
  document.removeEventListener("keydown", wakeUp);
}


const btnConfig = document.getElementById("btn-config");
const modalConfig = document.getElementById("modal-config");
const closeConfig = document.getElementById("closeConfig");
const volumeControl = document.getElementById("config-volume");
const darkToggle = document.getElementById("config-dark");
const languageSelect = document.getElementById("config-language");


btnConfig.addEventListener("click", () => {
  modalConfig.classList.remove("hidden");
});


closeConfig.addEventListener("click", () => {
  modalConfig.classList.add("hidden");
});

/* Volume */
volumeControl.addEventListener("input", (e) => {
  let vol = e.target.value / 100;

  openTabSound.volume = vol;
  closeTabSound.volume = vol;
  sleepSound.volume = vol;
});


/*
=========
Dark Mode
=========
*/

darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark");
    document.querySelector(".modal-box").classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.querySelector(".modal-box").classList.remove("dark");
  }
});
