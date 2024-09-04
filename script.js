const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inWord = document.getElementById("inp-word").value;
    fetch(`${url}${inWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const audioUrl = `${data[0].phonetics[0].audio}`;
            
            result.innerHTML = `
                <div class="word">
                    <h3>${inWord}</h3>
                    <button onclick="playSound()">
                        <img src="img/medium-volume.png" alt="" width="18px" />
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <div class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </div>
                <div class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </div>
            `;

            // Set the source of the audio element
            sound.setAttribute("src", audioUrl);
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't find the word</h3>`;
        });
});

function playSound() {
    sound.play().catch(error => {
        console.error('Error playing sound:', error);
    });
}

// https://https//api.dictionaryapi.dev/media/pronunciations/en/