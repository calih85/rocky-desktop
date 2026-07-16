const rocky = document.getElementById("rocky");

rocky.addEventListener("mousedown", () => {
    console.log("Friend... you grabbed me!");
});

const bubble = document.getElementById("thought-bubble");

const thoughts = [
    "Friend... Hello!",
    "Friend... Need more minerals.",
    "Friend... I detect coffee.",
    "Friend... Your code improves.",
    "Friend... Waiting for next mission.",
    "Friend... Jazz hands!"
];

setInterval(() => {
    const random = Math.floor(Math.random() * thoughts.length);
    bubble.textContent = thoughts[random];
}, 5000);