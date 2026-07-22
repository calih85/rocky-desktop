const { ipcRenderer } = require("electron");

const rocky = document.getElementById("rocky");
const bubble = document.getElementById("thought-bubble");

const thoughts = [
    "Friend... Hello! 🪨",
    "What's Nica doing? Question 🤔",
    "Rocky and Nica make Big Science! 🧪",
    "Friend... Ready for the next mission?",
    "Is debugging complete? Question 🤔",
    "Amaze! Amaze! Amaze! 😊",
    "Apologize.. Apologize.. Apologize.. 😔",

    "Friend... Good work today. 💙",
    "Coffee detected. ☕",
    "Git commit successful! 🚀",
    "Bugs are temporary. Learning is forever.",
    "Friend... I am floating! 😄",
    "High five, Nica! ✋",
    "Need more science! 🔬",
    "Friend... Excellent debugging."
];

let thoughtInterval;
let thoughtTimeout;
let resumeTimeout;
let reactionActive = false;
let isDragging = false;
let startMouse = null;
let hasMoved = false;

function changeThought(customText = null) {
    bubble.style.opacity = 0;

    thoughtTimeout = setTimeout(() => {
        bubble.textContent = customText || thoughts[Math.floor(Math.random() * thoughts.length)];
        bubble.style.opacity = 1;
    }, 300);
}

function startThoughtCycle() {
    clearInterval(thoughtInterval);
    thoughtInterval = setInterval(() => {
        changeThought();
    }, 5000);
}

function showGrabReaction() {

    console.log("showGrabReaction called");

    if (reactionActive) {
        return;
    }

    reactionActive = true;

    clearInterval(thoughtInterval);
    clearTimeout(thoughtTimeout);
    clearTimeout(resumeTimeout);

    changeThought("Friend... you grabbed me! 🪨");

    resumeTimeout = setTimeout(() => {
        reactionActive = false;
        startThoughtCycle();
    }, 3000);
}

rocky.addEventListener("mousedown", (event) => {
    isDragging = true;
    hasMoved = false;

    rocky.style.cursor = "grabbing";

    event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
    
    if (!isDragging) return; 

    if (event.movementX !==0 || event.movementY !== 0) {

        hasMoved = true;

        ipcRenderer.send(
            "move-window", 
            event.movementX, 
            event.movementY
        );
    }
        
});


document.addEventListener("mouseup", () => {
    
    if (!isDragging) return;

    isDragging = false;

    rocky.style.cursor = "grab";

    if (!hasMoved) {
        showGrabReaction();
    }   
});

startThoughtCycle();