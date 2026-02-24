let channelSlug = 'inspired-by-basketball' // The “slug” is just the end of the URL.
let myUsername = 'trenton-soto' // For linking to your profile.



// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (channelData) => {
	// Target some elements in your HTML:
	let channelTitle = document.querySelector('#channel-title')
	let channelDescription = document.querySelector('#channel-description')
	let channelCount = document.querySelector('#channel-count')
	let channelLink = document.querySelector('#channel-link')

	// Then set their content/attributes to our data:
	channelTitle.innerHTML = channelData.title
    // The attribution for this change in title will be inside of CSS, starting with "WORDBREAK ATTRIBUTION"
	channelDescription.innerHTML = channelData.description.html
	channelCount.innerHTML = channelData.counts.blocks
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (blockData) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.querySelector('#channel-blocks')

	// I wanted to make a shared template literal for the info that goes with every block, to avoid repetition
	// I used Claude to help me understand how to do this, and it was very helpful
	// I moved all my figcaptions and descriptions into this shared template literal, and it worked
	// Clause helped me with the bottom link "View on Are.na"
	// I haven't done this for text blocks yet
	let sharedInfo = `
		<div class="card-info">
    		<h4 class="card-title">${ blockData.title || '' }</h4>
   			<div class="card-description">${ blockData.description?.html || '' }</div>
    		<p class="card-link"><a href="https://www.are.na/block/${ blockData.id }">View on Are.na ↗</a></p>
		</div>
	`

	// Links!
	if (blockData.type == 'Link') {
		// Declares a “template literal” of the dynamic HTML we want.
		let linkItem =
			`
			<li class="link-block">
				<figure class="card-front">
					<picture>
						<source media="(width < 500px)" srcset="${ blockData.image.small.src_2x }">
						<source media="(width < 1000px)" srcset="${ blockData.image.medium.src_2x }">
						<img alt="${blockData.image.alt_text}" src="${ blockData.image.large.src_2x }">
					</picture>
				</figure>
				<div class="card-back">
					${ sharedInfo }
				</div>
			</li>
			`

		// And puts it into the page!
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)

		// More on template literals:
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	}

	// Images!
	else if (blockData.type == 'Image') {
		let imageItem =
        `
        <li class="image-block">
            <figure class="card-front">
                <picture>
                    <source media="(width < 500px)" srcset="${blockData.image.small.src_2x}">
                    <source media="(width < 1000px)" srcset="${blockData.image.medium.src_2x}">
                    <img alt="${blockData.image.alt_text}" src="${blockData.image.large.src_2x}">
                </picture>
            </figure>
			<div class="card-back">
				${ sharedInfo }
			</div>
        </li>
        `
        channelBlocks.insertAdjacentHTML('beforeend', imageItem)
    }
    // console.log("image-type", blockData);
    

	// Text!
	// It was working, but wasn't. It put the text files up, but everything else was not displaying, so I asked GPT, and it said to include a "?" in the description file and it worked. This helped to access the API that might be null. But, I still don't understand the specifics of this, just the big picture as a whole.
	else if (blockData.type == 'Text') {
        let textItem =
			`
			<li class="text-block">
			<span class="text-card-title">${blockData.title}</span>
				<div class="text">
					<p>${ blockData.content.html }</p>
					${ sharedInfo }
					<p>${ blockData.description?.html }</p>
				</div>
			</li>
			`

		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}

	// Uploaded (not linked) media…
	else if (blockData.type == 'Attachment') {
		let contentType = blockData.attachment.content_type // Save us some repetition.

		// Uploaded videos!
		if (contentType.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`
				<li class="video-block">
					<div class="card-front">
						<h4>${blockData.title}</h4>
						<video controls src="${ blockData.attachment.url }"></video>
					</div>
					<div class="card-back">
						${ sharedInfo }
					</div>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', videoItem)

			// More on `video`, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (contentType.includes('pdf')) {
			// …up to you!
		}

		// Uploaded audio!
		else if (contentType.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
				<li>
					<div class="card-front">
						<p><em>Audio</em></p>
						<audio controls src="${ blockData.attachment.url }"></audio>
					</div>
					<div class="card-back">
						${ sharedInfo }
					</div>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', audioItem)

			// More on`audio`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked (embedded) media…
	else if (blockData.type == 'Embed') {
		let embedType = blockData.embed.type

		// Linked video!
		if (embedType.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
				<li class="linked-video-block">
					<div class="card-front">
						${ blockData.embed.html }
					</div>
					<div class="card-back">
						${ sharedInfo }
					</div>
				</li>
				`

			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)

			// More on `iframe`:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embedType.includes('rich')) {
			// …up to you!
			let richItem = 
			`
			<li class="linked-video-block">
				<div class="card-front">
					${ blockData.embed.html }
				</div>
				<div class="card-back">
					${ sharedInfo }
				</div>
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', richItem)
		}
	}
}



// A function to display the owner/collaborator info:
let renderUser = (userData) => {
	let channelUsers = document.querySelector('#channel-users') // Container.

	let userAddress =
		`
		<address>
			<img src="${ userData.avatar }">
			<h3>${ userData.name }</h3>
			<p><a href="https://are.na/${ userData.slug }">Are.na profile ↗</a></p>
		</address>
		`

	channelUsers.insertAdjacentHTML('beforeend', userAddress)
}



// Finally, a helper function to fetch data from the API, then run a callback function with it:
let fetchJson = (url, callback) => {
	fetch(url, { cache: 'no-store' })
		.then((response) => response.json())
		.then((json) => callback(json))
}

// More on `fetch`:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch



// Now that we have said all the things we *can* do, go get the channel data:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}`, (json) => {
	console.log(json) // Always good to check your response!

	placeChannelInfo(json) // Pass all the data to the first function, above.
	renderUser(json.owner) // Pass just the nested object `.owner`.
})

// Get your info to put with the owner's:
fetchJson(`https://api.are.na/v3/users/${myUsername}/`, (json) => {
	console.log(json) // See what we get back.

	renderUser(json) // Pass this to the same function, no nesting.
})

// And the data for the blocks:
fetchJson(`https://api.are.na/v3/channels/${channelSlug}/contents?per=100&sort=position_desc`, (json) => {
	console.log(json) // See what we get back.

	// Loop through the nested `.data` array (list).
	json.data.forEach((blockData) => {
		// console.log(blockData) // The data for a single block.

		renderBlock(blockData) // Pass the single block’s data to the render function.
	})
})
