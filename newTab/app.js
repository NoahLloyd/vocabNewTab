//* RANDOM BACKGROUND IMAGE
document.getElementById("background").src = `./backgroundImages/${Math.floor(
  Math.random() * Math.floor(window.innerWidth / 400)
)}.jpg`;

//* Get the top sites and add them to document
const setTopSites = (mostVisitedURLs) => {
  const favicons = document.querySelectorAll('.favicon')
  const siteNames = document.querySelectorAll('.site-name')
  const links = document.querySelectorAll('.link')
  const parent =  document.getElementById('quickLinks')
  console.log(window.innerWidth)
  mostVisitedURLs = mostVisitedURLs.slice(0,Math.floor(window.innerWidth / 400) + 1)
  for (let i = 0; i < mostVisitedURLs.length; i++) {
    let url = mostVisitedURLs[`${i}`].url
    let title = mostVisitedURLs[`${i}`].title

    if (title.length > 35) {
      title = url.replace(/.+\/\/|www.|\..+/g, '')
    }

    let link = document.createElement('a')
    link.href = url
    link.classList.add('link')
    let quickLink = document.createElement('article')
    quickLink.classList.add('quick-link')
    link.appendChild(quickLink)
    let image = document.createElement('img')
    image.src = `https://s2.googleusercontent.com/s2/favicons?domain=${mostVisitedURLs[`${i}`].url.split('//')[1]}`
    image.classList.add('favicon')
    quickLink.appendChild(image)
    let siteName = document.createElement('p')
    siteName.classList.add('site-name')
    siteName.textContent = title
    quickLink.appendChild(siteName)

    parent.appendChild(link)


  }
}
chrome.topSites.get(setTopSites)

//* GET STATS AND DISPLAY
const getStatsAndDisplay = () => {
  // Checks if the words seen has been defined yet
  // let wordsSeen = chrome.storage.local.get(["wordsSeen"], () => {});
  // document.getElementById("words-seen").textContent = wordsSeen.toString();
};
getStatsAndDisplay();


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
    hear.removeEventListener("click", () => {});
    hear.addEventListener("click", () => {
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

// On search, redirects to the google search url
document.getElementById('searchIcon').addEventListener('click', () => {
  const search = document.getElementById('searchBar').value
  search.replace(' ','+')
  window.location = `https://www.google.com/search?q=${search}`
})

// To detect when pressing enter, checks if you're searching
document.addEventListener('keydown', (event) => {
  if (event.keyCode != 13) return
  if (document.activeElement != document.getElementById('searchBar')) return 

  const search = document.getElementById('searchBar').value
  search.replace(' ','+')
  window.location = `https://www.google.com/search?q=${search}`
})