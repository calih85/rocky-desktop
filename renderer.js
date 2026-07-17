const rocky = document.getElementById("rocky");
const bubble = document.getElementById("thought-bubble");

rocky.addEventListener("mousedown", () => {
    console.log("Friend... you grabbed me!");
});

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

function changeThought() {

    bubble.style.opacity = 0;

    setTimeout(() => {

        const random =
            thoughts[Math.floor(Math.random() * thoughts.length)];

        bubble.textContent = random;

        bubble.style.opacity = 1;

    }, 500);

}

setInterval(changeThought, 5000);