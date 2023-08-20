// When page loads, fetch winners from the database 
window.addEventListener('load', fetchWinners)

function fetchWinners() {
    fetch('http://localhost:3000/winners')
        .then(response => response.json())
        .then(data => makeCard(data))
}

function makeCard(data) {
    for (let i = 0; i < data.length; i++) {
        const collectionDiv = document.getElementById('winner-collection')
        const newDiv = document.createElement('div')
        newDiv.className = 'card'

        const newHeader = document.createElement('h2')
        newHeader.textContent = data[i].name
        newDiv.append(newHeader)

        const newImg = document.createElement('img')
        newImg.className = 'winner-avatar'
        newImg.src = data[i].image
        newDiv.append(newImg)

        const newP = document.createElement('p')
        newP.likes = data[i].likes
        newP.textContent = `${data[i].likes} Likes`
        newDiv.append(newP)

        const newButton = document.createElement('button')
        newButton.className = 'like-btn'
        newButton.id = data[i].id
        newButton.textContent = 'Like ❤️'
        newDiv.append(newButton)

        collectionDiv.append(newDiv)
    }
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
    const id = this.id

    // Get current number of likes
    fetch(`http://localhost:3000/winners/${id}`)
        .then(response => response.json())
        .then(data => processLikes(data))

    function processLikes(data) {
        let numberOfLikes = parseInt(data.likes)
        numberOfLikes++

        // Update number of likes
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

    function updateLikes(data) {
        const id = data.id
        const numbLikes = data.likes
        const likesP = document.getElementById(id).previousSibling
        likesP.textContent = `${numbLikes} Likes`
    }

}





// Reveal Stats when Card is Clicked
// allAvatars = document.querySelectorAll(".winner-avatar")
// allAvatars.forEach(card => card.addEventListener('click',revealStats));

function retrieveStats(params) {
    
}

function populateStats(params) {
    
}

function revealStats(params) {
    
}