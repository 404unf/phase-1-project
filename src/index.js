


// When page loads, fetch toys from the database 
addEventListener('DOMContentLoaded', fetchWinners)

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