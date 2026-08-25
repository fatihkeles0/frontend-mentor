// get data.json file content


fetch('data.json')

    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        
        const randomTextNumber = Math.floor((Math.random() * data.easy.length))
        randomEasyTextPassage = data.easy[randomTextNumber].text;
        // writting the typing text
        const typingText = document.getElementById("typing-text");
        typingText.textContent = randomEasyTextPassage;
    })


    .catch(function(error) {

        console.log("Error json is not found : ", error);
    });







