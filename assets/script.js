let showAllButton = document.querySelector('#show-all')
let showLinksButton = document.querySelector('#show-links')
let showImagesButton = document.querySelector('#show-images')
let showVideosButton = document.querySelector('#show-videos')
let showTextButton = document.querySelector('#show-text')


let channelBlocks = document.querySelector('#channel-blocks')

showAllButton.addEventListener('click', () => {
    channelBlocks.classList.remove('show-links', 'show-images', 'show-videos', 'show-text')
})

showLinksButton.addEventListener('click', () => {
    channelBlocks.classList.remove('show-images', 'show-videos', 'show-text')
    channelBlocks.classList.add('show-links')
})

showImagesButton.addEventListener('click', () => {
    channelBlocks.classList.remove('show-links', 'show-videos', 'show-text')
    channelBlocks.classList.add('show-images')
})

showVideosButton.addEventListener('click', () => {
    channelBlocks.classList.remove('show-links', 'show-images', 'show-text')
    channelBlocks.classList.add('show-videos')
})

showTextButton.addEventListener('click', () => {
    channelBlocks.classList.remove('show-links', 'show-images', 'show-videos')
    channelBlocks.classList.add('show-text')
})

// from week 17 class site
let modal = document.querySelector('#card-modal')
let modalContent = document.querySelector('#modal-content')
let closeButton = document.querySelector('#close-modal')

channelBlocks.addEventListener('click', (event) => { // “Listen” for clicks.
    let card = event.target.closest('#channel-blocks li')
    let info = card.querySelector('.card-info')
    
    // used innerHTML from the arena.js file 
    // 
    modalContent.innerHTML = info.innerHTML
    modal.showModal() // This opens it up.
})

closeButton.addEventListener('click', () => {
    modal.close() // And this closes it!
})

// code completion done for me with built in Copilot, based on the code above and from the week 17 class site
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close() // Close it too then.
    }
})