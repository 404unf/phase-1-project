// When page loads, fetch winners from the database 
window.onload = function () {
    if (document.readyState == 'complete') {
        fetchWinners()
    }
};
// window.addEventListener('load', fetchWinners)

function fetchWinners() {
    fetch('http://localhost:3000/winners')
        .then(response => response.json())
        .then(data => makeCard(data))
}

function makeCard(data) {
    for (let i = 0; i < data.length; i++) {
        const survivorId = data[i].id

        const collectionDiv = document.getElementById('winner-collection')
        const newDiv = document.createElement('div')
        newDiv.className = 'card'

        const newHeader = document.createElement('h2')
        newHeader.className = 'card-header'
        newHeader.textContent = data[i].name
        newDiv.append(newHeader)

        const newImgDiv = document.createElement('div')
        newImgDiv.className = 'img-wrapper'

        const newImg = document.createElement('img')
        newImg.className = 'winner-avatar'
        newImg.src = data[i].image
        newImgDiv.append(newImg)
        // newDiv.append(newImg)

        // const newP = document.createElement('p')
        // newP.id = `p-${survivorId}`
        // newP.likes = data[i].likes
        // newP.textContent = `${data[i].likes} Likes`
        // newDiv.append(newP)

        // const newBtnDiv = document.createElement('div')
        // newBtnDiv.id = 'btn-div'

        // const newLikeButton = document.createElement('button')
        // newLikeButton.className = 'like-btn'
        // newLikeButton.id = `like-btn-${survivorId}`
        // newLikeButton.textContent = 'Like ❤️'
        // newBtnDiv.append(newLikeButton)

        // const newStatsButton = document.createElement('button')
        // newStatsButton.className = 'stats-btn'
        // newStatsButton.id = `stats-btn-${survivorId}`
        // newStatsButton.textContent = 'Stats'
        // newBtnDiv.append(newStatsButton)

        // newDiv.append(newBtnDiv)

        const newOverlay = document.createElement('div')
        newOverlay.className = 'overlay'

        const newOverlayText = document.createElement('div')
        newOverlayText.className = 'overlay-text'

        const overlayHeader = document.createElement('h4')
        overlayHeader.textContent = 'Seasons Won'
        newOverlayText.append(overlayHeader)

        const newOverlayList = document.createElement('ul')
        newOverlayList.className = 'overlay-list'
        newOverlayList.id = `overlay-list-${survivorId}`
        newOverlayText.append(newOverlayList)

        retrieveStats(survivorId)

        newOverlay.append(newOverlayText)

        newImgDiv.append(newOverlay)
        newDiv.append(newImgDiv)

        const newP = document.createElement('p')
        newP.className = 'likes-p'
        newP.id = `p-${survivorId}`
        newP.likes = data[i].likes
        newP.textContent = `${data[i].likes} Likes`
        newDiv.append(newP)

        const newBtnDiv = document.createElement('div')
        newBtnDiv.id = 'btn-div'

        const newLikeButton = document.createElement('button')
        newLikeButton.className = 'like-btn'
        newLikeButton.id = `like-btn-${survivorId}`
        newLikeButton.textContent = 'Like ❤️'
        newBtnDiv.append(newLikeButton)

        const newStatsButton = document.createElement('button')
        newStatsButton.className = 'stats-btn'
        newStatsButton.id = `stats-btn-${survivorId}`
        newStatsButton.textContent = 'Stats'
        newBtnDiv.append(newStatsButton)

        newDiv.append(newBtnDiv)

        collectionDiv.append(newDiv)
    }
}

// Populate Stats to be revealed
// when Hovering over the image
function retrieveStats(id) {
    fetch(`http://localhost:3000/winners/${id}`)
        .then(response => response.json())
        .then(data => populateStats(data))
}

function populateStats(data) {
    const seasons = data.seasons_won
    const survivorId = data.id

    seasons.forEach(season => attachLi(survivorId, season))
}

function attachLi(id, season) {
    const overlayList = document.getElementById(`overlay-list-${id}`)

    const overlayLi = document.createElement('li')
    overlayLi.textContent = season

    overlayList.appendChild(overlayLi)
}


// Like Button Functionality
// When the like button is clicked, increase the number of likes in the database
setTimeout(() => {
    executeLikes()
}, 3000);

function executeLikes() {
    const likeButtons = document.querySelectorAll('.like-btn')
    likeButtons.forEach(button => button.addEventListener('click', addLikes))
}

function addLikes(event) {
    event.preventDefault()
    const id = this.id.replace('like-btn-', '')

    // Get current number of likes
    fetch(`http://localhost:3000/winners/${id}`)
        .then(response => response.json())
        .then(data => processLikes(id,data))
}

function processLikes(id,data) {
    let numberOfLikes = parseInt(data.likes)
    numberOfLikes++

    // Update number of Likes in the database
    fetch(`http://localhost:3000/winners/${id}`, {
        method: 'PATCH',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            'likes': numberOfLikes
        })
    })
        .then(response => response.json())
        .then(data => updateLikes(data))
}

// Update Likes on the webpage
function updateLikes(data) {
    const id = data.id
    const numbLikes = data.likes
    const likesP = document.getElementById(`p-${id}`)
    likesP.textContent = `${numbLikes} Likes`
}





// Stat Button Functionality
// setTimeout(() => {
//     executeStats()
// }, 3000);

// function executeStats() {
//     const statsButtons = document.querySelectorAll('.stats-btn')
//     statsButtons.forEach(button => button.addEventListener('click', revealStats))
// }

// function revealStats(params) {
    
// }

function revealStats() {
    const x = document.querySelectorAll('overlay');
    x.forEach(overlay => {if (overlay.style.display === "none") {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    } })

}