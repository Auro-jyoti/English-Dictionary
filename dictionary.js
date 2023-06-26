const inputBtn = document.getElementById("input");
const infoBtn = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");

const title = document.getElementById("title");
const meaning = document.getElementById("meaning");

const audio = document.getElementById("audio");

async function fetchApi(word) {

    try {
        infoBtn.style.display = "block";
        meaningContainer.style.display = "none";

        infoBtn.innerText = `Searching for the word "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        // console.log(data[0].word);
        // console.log(data[0].meanings[0]);


        if (data.title) {
            meaningContainer.style.display = "block";
            infoBtn.style.display = "none";
            title.innerText = word;
            meaning.innerText = "N/A"
            audio.style.display = "none";
        } else {
            infoBtn.style.display = "none";
            meaningContainer.style.display = "block";

            title.innerText = word;
            meaning.innerText = data[0].meanings[0].definitions[0].definition;
            audio.style.display = "inline";
            audio.src = data[0].phonetics[0].audio;
        }

    } catch (error) {
        infoBtn.innerText = `Network error, please try again later`;
    }

}

inputBtn.addEventListener("keyup", (event) => {
    if (event.target.value && event.key === "Enter") {
        fetchApi(event.target.value);
    }
});



