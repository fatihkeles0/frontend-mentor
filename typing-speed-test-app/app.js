const body = document.body;

const typingTestApp = document.getElementById("typing-test-app");
// typing text content here (easy, medium, hard)
const typingText = document.getElementById("typing-text");
// typing test start button
const typingTestStartBtn = document.querySelector(".typing-test-app__start-button");
// typing test start text
const typingTestStartHint = document.getElementById("typing-test-app__start-hint")
// all span letter
const currentLetter = typingText.querySelectorAll("span");

let current = 0;
let currentText = "";
let isStarted = false;
let isFinished = false;

fetch('data.json')

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        getRandomTextWithIndex(data);
    })

    .catch(function (error) {
        console.log("Error json is not found ! ", error);
    });


function getRandomTextWithIndex(data) {
    let createRandomNumber = Math.floor(Math.random() * data.easy.length);
    let randomText = data.easy[createRandomNumber].text;
    renderTextAsSpans(randomText);
}


function renderTextAsSpans(randomText) {
    for (let everyLetter of randomText) {

        let newSpan = document.createElement("span");

        newSpan.className = "letter";

        newSpan.textContent = everyLetter;

        typingText.appendChild(newSpan);
        
    }
    setCurrentLetter(typingText);
}


function run() {
    // Start typing text events
    typingTestStartBtn.addEventListener("click", handleStartClick);
    typingTestStartHint.addEventListener("click", handleStartClick);
    // Handle to key and check it
    body.addEventListener("keydown", handleKeyDown);
}


function setCurrentLetter(typingText) {

    currentLetter[current].classList.add("current");
    currentText = currentLetter[current].textContent;
}

// start typing text.
function handleStartClick() {

    typingTestApp.classList.remove("typing-test-app--not-started");
    typingTestApp.classList.add("typing-test-app--started");
    isStarted = true;
}

// handle and lisyten the user input keys.
function handleKeyDown(e) {
   
    if (isStarted === true) {
                // delete key event
        if (e.key === "Backspace") {
            setDeleteLetter();
            return;
        }
        // filter : capslock, shift etc...
        
        if (e.key.length !== 1){
            return;
        }

        // correct incorrect situtation
        if (e.key === currentText) {
            setCorrectLetter();
        } else {
            setWrongLetter();
        }

    }
}



function setCorrectLetter() {
    if (isFinished === false) {

        currentLetter[current].classList.remove("current");
        currentLetter[current].classList.add("correct");
        current++;

        if (current !== currentLetter.length) {
            currentLetter[current].classList.add("current");
            currentText = currentLetter[current].textContent;
        }
        else {
            isFinished = true;
            return;
        }
    }



}

function setWrongLetter() {
    if (isFinished === false) {

        currentLetter[current].classList.remove("current");
        currentLetter[current].classList.add("inCorrect");

        current++;
        if (current !== currentLetter.length) {

            currentLetter[current].classList.add("current");
            currentText = currentLetter[current].textContent;
        }
        else {
            isFinished = true;
            return;
        }
    }
}


function setDeleteLetter() {

    if (current > 0){
        if (currentLetter[current]){

            currentLetter[current].classList.remove("current");
        }
        current--;
        currentLetter[current].classList.remove("correct");
        currentLetter[current].classList.remove("inCorrect");
        currentLetter[current].classList.add("current");
        currentText = currentLetter[current].textContent;
        isFinished = false;
        return;
    }

}

run();