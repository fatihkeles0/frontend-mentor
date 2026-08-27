const body = document.body;

const typingTestApp = document.getElementById("typing-test-app");
// typing text content here (easy, medium, hard)
const typingText = document.getElementById("typing-text");
// typing test start button
const typingTestStartBtn = document.querySelector(".typing-test-app__start-button");
// typing test start text
const typingTestStartText = document.getElementById("typing-test-app__start-hint");
// current letter 
let current = 0;
let currentText = "";
let isStarted = false;
let isFinished = false;

function run() {
    typingTestStartBtn.addEventListener("click", typingTestStart);
    typingTestStartText.addEventListener("click", typingTestStart);
    body.addEventListener("keydown", keyListener);
}


function typingTestStart() {
    isStarted = true;
    typingTestApp.classList.remove('typing-test-app--not-started');
    typingTestApp.classList.add('typing-test-app--started');

}


// get data.json file content

fetch('data.json')

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {

        const randomTextNumber = Math.floor((Math.random() * data.easy.length))
        const randomEasyTextPassage = data.easy[randomTextNumber].text;
        // writting the typing text
        for (let everyLetter of randomEasyTextPassage) {
            createLetterSpan(everyLetter);
        }

        function createLetterSpan(letter) {
            const newSpan = document.createElement("span");
            newSpan.className = "spanLetter";
            newSpan.textContent = letter;
            typingText.appendChild(newSpan);
            setCurrentLetter(typingText);
        }
    })


    .catch(function (error) {

        console.log("Error json is not found : ", error);
    });


function setCurrentLetter(typingText) {
    let currentLetterSpan = typingText.querySelectorAll("span");

    currentLetterSpan[current].classList.add("current");
    currentText = currentLetterSpan[current].textContent;

}


function keyListener(e) {
    if (isStarted === true) {
        if (isFinished === false) {
            if (current > 0) {

                if (e.key === "Backspace") {
                    let currentLetter = typingText.querySelectorAll("span");
                    currentLetter[current].classList.remove('current');
                    current -= 1;
                    currentLetter[current].classList.remove('correct');
                    currentLetter[current].classList.remove('inCorrect');
                    currentLetter[current].classList.add('current');
                    currentText = currentLetter[current].textContent;
                    return;

                }
            }

            if (e.key.length > 3) {
                return;
            }

            if (e.key === currentText) {
                let currentLetter = typingText.querySelectorAll("span");
                currentLetter[current].classList.remove('current');
                currentLetter[current].classList.add('correct');
                current++;
                if (current !== currentLetter.length) {
                    currentLetter[current].classList.add('current');
                    currentText = currentLetter[current].textContent;
                }
                else {
                    isFinished = true;
                    return;
                }
            }

            else {
                let currentLetter = typingText.querySelectorAll("span");
                currentLetter[current].classList.remove('current');
                currentLetter[current].classList.add('inCorrect');
                current += 1
                if (current !== currentLetter.length) {
                    currentLetter[current].classList.add('current');
                    currentText = currentLetter[current].textContent;
                }
                else {
                    isFinished = true;
                    return;
                }

            }

        }
    }
}

run()






