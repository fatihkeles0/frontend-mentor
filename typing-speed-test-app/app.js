const body = document.body;
const typingTestApp = document.getElementById("typing-test-app");
// typing text content here (easy, medium, hard)
const typingText = document.getElementById("typing-text");
// typing test start button
const typingTestStartBtn = document.querySelector(".typing-test-app__start-button");
// typing test start text
const typingTestStartHint = document.getElementById("typing-test-app__start-hint");
const typingTestRestartBtn = document.getElementById("typing-test-app__restart-button");
const time = document.querySelector(".header__result-value.header__result-value--time");


let current = 0;
let currentText = "";
let isStarted = false;
let isFinished = false;
let data;
let isTimerStarted = false;

fetch("data.json")

    .then(function (response) {
        return response.json();
    })
    .then(function (jsonData) {
        data = jsonData;
        getRandomTextWithIndex(data);
    })
    .catch(function (error) {
        console.log("Error json is not found ! ", error);
    });



function getRandomTextWithIndex(data) {

    let createRandomNumber = Math.floor(Math.random() * data.hard.length);
    let randomText = data.hard[createRandomNumber].text;

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

function setCurrentLetter(typingText) {

    let currentLetter = typingText.querySelectorAll("span");

    currentLetter[current].classList.add("current");

    currentText = currentLetter[current].textContent;
}


function run() {
    // Start typing test events

    typingTestStartBtn.addEventListener("click", handleStartClick);

    typingTestStartHint.addEventListener("click", handleStartClick);

    // Handle to key and check it

    body.addEventListener("keydown", handleKeyDown);

    // Restart typing test event

    typingTestRestartBtn.addEventListener("click", function () {
        typingText.innerHTML = "";
        current = 0;
        currentText = "";
        isFinished = false;
        getRandomTextWithIndex(data);
        time.textContent = 60;
    });
}



// start typing text.

function handleStartClick() {

    typingTestApp.classList.remove("typing-test-app--not-started");

    typingTestApp.classList.add("typing-test-app--started");
    isStarted = true;
}

// handle and listen the user input keys.

function handleKeyDown(e) {

    if (isStarted === true) {

        setCountDown();

        if (e.key === "Backspace") {
            setDeleteLetter();
            return;
        }

        // filter : capslock, shift etc...

        if (e.key.length !== 1) {
            return;
        }

        // correct incorrect situation
        if (e.key === currentText) {
            setCorrectLetter();
        } else {
            setWrongLetter();
        }
    }
}

function setCorrectLetter() {

    if (isFinished === false) {

        let Letters = typingText.querySelectorAll("span");

        Letters[current].classList.remove("current");

        Letters[current].classList.add("correct");

        current++;

        if (current !== Letters.length) {

            Letters[current].classList.add("current");

            currentText = Letters[current].textContent;

        } else {

            isFinished = true;

            return;
        }
    }
}

function setWrongLetter() {

    if (isFinished === false) {

        let currentLetter = typingText.querySelectorAll("span");

        currentLetter[current].classList.remove("current");

        currentLetter[current].classList.add("inCorrect");

        current++;

        if (current !== currentLetter.length) {

            currentLetter[current].classList.add("current");

            currentText = currentLetter[current].textContent;

        } else {

            isFinished = true;

            return;
        }
    }
}

function setDeleteLetter() {

    let currentLetter = typingText.querySelectorAll("span");

    if (current === currentLetter.length) {

        isFinished = true;

        return;
    }

    if (current > 0) {
        if (currentLetter[current]) {
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


function setCountDown() {

    if (isTimerStarted === false) {
        let timer = setInterval(() => {
            let timeNumber = Number(time.textContent);
            timeNumber--;
            time.textContent = timeNumber;
            if (timeNumber === 0) {
                isFinished = true;
                clearInterval(timer);
            }
        }, 1000);


        isTimerStarted = true;
    }
}

run();