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