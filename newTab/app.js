import { parseDomain, ParseResultType } from "../node_modules/parse-domain";

//* RANDOM BACKGROUND IMAGE
document.getElementById("background").src = `./backgroundImages/${Math.floor(
  Math.random() * Math.floor(window.innerWidth / 400)
)}.jpg`;

//* Get the top sites and add them to document
const setTopSites = (mostVisitedURLs) => {
  const favicons = document.querySelectorAll('.favicon')
  const siteNames = document.querySelectorAll('.site-name')
  const links = document.querySelectorAll('.link')
  const parent = document.getElementById('quickLinks')
  console.log(window.innerWidth)
  mostVisitedURLs = mostVisitedURLs.slice(0, Math.floor(window.innerWidth / 400) + 1)
  for (let i = 0; i < mostVisitedURLs.length; i++) {
    let url = mostVisitedURLs[`${i}`].url

    // Gets the domain name of url fx: www.app.something.co.uk = something
    let parseResult = parseDomain(url)
    if (parseResult.type === ParseResultType.Listed) {
      const { domain } = parseResult;
    }
    let title = domain

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

//* GET TIME AND INPUT IT
const getTime = () => {
  const now = new Date();
  const hours = now.getHours()
  const minutes = now.getMinutes()

  const hoursDisplay = document.getElementById('hours')
  const minutesDisplay = document.getElementById('minutes')
  hoursDisplay.innerText = hours
  minutesDisplay.innerText = minutes
}
setInterval(getTime, 3000)
getTime()

//* GET STATS AND DISPLAY
const getStatsAndDisplay = () => {
  // Checks if the words seen has been defined yet
  // let wordsSeen = chrome.storage.local.get(["wordsSeen"], () => {});
  // document.getElementById("words-seen").textContent = wordsSeen.toString();
};
getStatsAndDisplay();


// On search, redirects to the google search url
document.getElementById('searchIcon').addEventListener('click', () => {
  const search = document.getElementById('searchBar').value
  search.replace(' ', '+')
  window.location = `https://www.google.com/search?q=${search}`
})

// To detect when pressing enter, checks if you're searching
document.addEventListener('keydown', (event) => {
  if (event.keyCode != 13) return
  if (document.activeElement != document.getElementById('searchBar')) return

  const search = document.getElementById('searchBar').value
  search.replace(' ', '+')
  window.location = `https://www.google.com/search?q=${search}`
})
