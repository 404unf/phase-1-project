// When page loads, fetch winners from the database 
window.onload = function () {
    if (document.readyState == 'complete') {
        fetchWinners()
    }
};

function fetchWinners() {
    console.log("I've been fetched")
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

        const newBtnDiv = document.createElement('div')
        newBtnDiv.id = 'btn-div'

        const newLikeButton = document.createElement('button')
        newLikeButton.className = 'like-btn'
        newLikeButton.id = data[i].id
        newLikeButton.textContent = 'Like ❤️'
        newBtnDiv.append(newLikeButton)

        const newStatsBtn = document.createElement('button')
        newStatsBtn.className = 'stats-btn'
        newStatsBtn.id = data[i].id
        newStatsBtn.textContent = 'Stats'
        newBtnDiv.append(newStatsBtn)

        newDiv.append(newBtnDiv)
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




// Stats Button Functionality
// Reveal Stats when Card is Clicked

function executeStats() {
    const statsButtons = document.querySelectorAll('.stat-btn')
    statsButtons.forEach(button => button.addEventListener('click', revealStats))
}

function retrieveStats(params) {
    
}

function populateStats(params) {
    
}

function revealStats(params) {
    
}