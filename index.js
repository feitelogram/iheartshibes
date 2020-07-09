const currentDogDiv = document.querySelector("#doggo")
const nextButton = document.querySelector("#next")
const diffButton = document.querySelector("#diff")
const previousDogsDiv = document.querySelector("#previous")
const otherOptions = document.querySelector("#others")
const header = document.querySelector('h1')


const previousDogs = []
let currentDogImg = ''
let currentBreed = 'shiba'

const dogOptions = ['akita', 'basenji', 'chow', 'doberman', 'newfoundland', 'pitbull', 'whippet', 'shiba']

const dogImg = (imgString, size=50) => {
  return `<img style=height:${size}%;width:${size}%; src=${imgString} alt="doggo"/>`
}

const fetchDog = (breed) => {

  const url = `https://dog.ceo/api/breed/${breed}/images/random`
  fetch(url)
  .then(resp => resp.json())
  .then(dogJson => {
    currentDogImg = dogJson.message
    currentDogDiv.innerHTML = dogImg(currentDogImg)
  })
}

const displayPreviousDogs = () => {
  previousDogsDiv.innerHTML = previousDogs.map(dog => dogImg(dog,25))
}

const nextDog = () => {
  previousDogs.push(currentDogImg)
  fetchDog(currentBreed)
  displayPreviousDogs()
}

const randomDog = () => {
  const randomIndex = Math.floor(Math.random()*(dogOptions.length-1))
  currentBreed = dogOptions[randomIndex]
  nextDog()
  currentBreed = 'shiba'
}

const changeDog = (breed) => {
  currentBreed = breed
  let str = breed === 'shiba' ? "shibe" : String(breed)
  header.innerText = `I HEART ${str.toUpperCase()}S`
  nextButton.innerText= `next ${str} plz`
  diffButton.innerText= breed === 'akita' ? `not an ${str} plz` : `not a ${str} plz`
  nextDog()
  window.scroll(0,0)
}

const clickableDiv = (breed) => {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`
  fetch(url)
  .then(resp => resp.json())
  .then(dogJson => {
    let dogDiv = document.createElement("div")
    let dogImg = document.createElement("img")
    let dogTitle = document.createElement('h4')
    dogImg.src = dogJson.message
    dogImg.alt = `${breed}`
    dogImg.style.height = "25%"
    dogImg.style.width = "25%"
    dogDiv.className = `${breed}`
    dogDiv.style.cursor = "pointer"
    dogTitle.innerText= `${breed}`
    dogDiv.append(dogImg, dogTitle)
    dogDiv.addEventListener("click", () => {
      changeDog(breed)
    })
    otherOptions.append(dogDiv)
  })
}

const displayOptions = () => {
  dogOptions.map(breed => clickableDiv(breed))
}

nextButton.addEventListener("click", nextDog)
diffButton.addEventListener("click", randomDog)
otherOptions.style.display = "inline-block"

fetchDog(currentBreed)
displayOptions()