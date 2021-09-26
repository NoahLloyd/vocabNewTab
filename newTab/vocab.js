//* SET NEW WORD
const words = [
    "aberration",
    "abhor",
    "acquiesce",
    "alacrity",
    "amiable",
    "appease",
    "arcane",
    "avarice",
    "brazen",
    "brusque",
    "cajole",
    "callous",
    "candor",
    "chide",
    "circumspect",
    "clandestine",
    "coerce",
    "coherent",
    "complacency",
    "confidant",
    "connive",
    "cumulative",
    "debase",
    "decry",
    "deferential",
    "demure",
    "deride",
    "despot",
    "diligent",
    "elated",
    "eloquent",
    "embezzle",
    "empathy",
    "enmity",
    "erudite",
    "extol",
    "fabricate",
    "feral",
    "flabbergasted",
    "forsake",
    "fractious",
    "furtive",
    "gluttony",
    "gratuitous",
    "haughty",
    "hypocrisy",
    "impeccable",
    "impertinent",
    "implacable",
    "impudent",
    "incisive",
    "indolent",
    "inept",
    "infamy",
    "inhibit",
    "innate",
    "insatiable",
    "insular",
    "intrepid",
    "inveterate",
    "jubilant",
    "knell",
    "lithe",
    "lurid",
    "maverick",
    "maxim",
    "meticulous",
    "modicum",
    "morose",
    "myriad",
    "nadir",
    "nominal",
    "novice",
    "nuance",
    "oblivious",
    "obsequious",
    "obtuse",
    "panacea",
    "parody",
    "penchant",
    "perusal",
    "plethora",
    "predilection",
    "quaint",
    "rash",
    "refurbish",
    "repudiate",
    "rife",
    "salient",
    "serendipity",
    "staid",
    "superfluous",
    "sycophant",
    "taciturn",
    "truculent",
    "umbrage",
    "venerable",
    "vex",
    "vociferous",
    "wanton",
    "zenith",
];

const getWord = async (word) => {
    const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (response.ok) {
        let result = await response.json();
        result = result["0"];

        let hear = result.phonetics["0"].audio;
        hear = "https:" + hear;
        // returns [word, pos, top 4 synonyms, definition, sentence, origin, phonetics: [text, audio]]
        return {
            word: result.word[0].toUpperCase() + result.word.slice(1),
            pos: result.meanings["0"].partOfSpeech,
            synonyms: result.meanings["0"].definitions["0"].synonyms.slice(0, 4),
            definition: result.meanings["0"].definitions["0"].definition,
            sentence: result.meanings["0"].definitions["0"].example,
            origin: result.origin,
            phonetics: [result.phonetics["0"].text, hear],
        };
    }
};

const setWord = async (newWord) => {
    const word = document.getElementById("word");
    const pos = document.getElementById("pos");
    const synonyms = document.querySelectorAll(".synonym");
    const definition = document.getElementById("definition");
    const sentence = document.getElementById("sentence");
    const origin = document.getElementById("origin");
    const hear = document.getElementById("hear");
    const phonetic = document.getElementById("phonetic");

    const wordInfo = await getWord(newWord);
    // All the elements where the text just has to be replaced
    word.textContent = wordInfo.word;
    pos.textContent = wordInfo.pos;
    definition.textContent = wordInfo.definition;
    sentence.textContent = wordInfo.sentence;
    origin.textContent = wordInfo.origin;
    phonetic.textContent = wordInfo.phonetics[0];

    hear.src = wordInfo.phonetics[1];
    hear.removeEventListener("click", () => { });
    hear.addEventListener("click", () => {
        if (pos.innerText === 'pos') { // Checks for wifi
            new Audio('https://ssl.gstatic.com/dictionary/static/sounds/20200429/word--_gb_1.8.mp3').play()
            return
        }
        const wordAudio = new Audio(wordInfo.phonetics[1]);
        wordAudio.play();
    });
    // phonetic.textContent = wordInfo.phonetics[0];
    // const changeElementsText = [word,pos,definition,sentence,origin,hear,phonetic]
    // for (let i = 0; i < changeElementsText; i++) {
    //   changeElementsText[i].textContent = wordInfo[`${changeElementsText[i].id}`]
    // }

    for (let i = 0; i < synonyms.length; i++) {
        synonyms[i].textContent = wordInfo.synonyms[i];
    }
};

setWord(words[Math.floor(Math.random() * 100)]);

//* ATTRIBUTE VISIBILITY TOGGLE
// const showAttributes = () => {
//   let attributes = document.getElementById("attributes").style.display;
//   let toggle = document.getElementById("toggleAttributes").style.display;
//   if (true) {
//     attributes = "static !important";
//     toggle = "none";
//     return;
//   }
//   attributes = "none";
//   toggle = "static";
// };

const synonyms = document.querySelectorAll(".synonym");
for (const synonym of synonyms) {
    synonym.addEventListener("click", () => {
        setWord(synonym.textContent);
    });
}