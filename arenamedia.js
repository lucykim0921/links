document.addEventListener('DOMContentLoaded', function() {
    // This allows us to process/render the descriptions, which are in Markdown!
    // More about Markdown: https://en.wikipedia.org/wiki/Markdown
    let markdownIt = document.createElement('script');
    markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
    document.head.appendChild(markdownIt);

    // Okay, Are.na stuff!
    let channelSlug = 'seraphim-2t-ulfxxma0'; // The “slug” is just the end of the URL

    // First, let’s lay out some *functions*, starting with our basic metadata:
    let placeChannelInfo = (data) => {
        // Target some elements in your HTML:
        let channelTitle = document.getElementById('channel-title');
        let chanfnelDescription = document.getElementById('channel-description');
        let channelCount = document.getElementById('channel-count');
        let channelLink = document.getElementById('channel-link');

        // Then set their content/attributes to our data:
        channelTitle.innerHTML = data.title;
        // channelDescription.innerHTML = window.markdownit().render(data.metadata.description); // Converts Markdown → HTML
        // channelCount.innerHTML = data.length;
        channelLink.href = `https://www.are.na/channel/${channelSlug}`;
    };



    //function for navigation scroll
    document.addEventListener('DOMContentLoaded', function() {
        // Check if the URL contains a hash that matches the ID of the image container
        if (window.location.hash === '#image-container') {
            // Scroll to the image container section
            let imageContainer = document.getElementById('image-container');
            if (imageContainer) {
                imageContainer.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });


    // Then our big function for specific-block-type rendering:
    let renderBlock = (block) => {
        // To start, a shared `ul` where we’ll insert all our blocks
        let channelBlocks = document.getElementById('channel-blocks');

           // Text!
           if (block.class == 'Text') {
            // …up to you!
            console.log(block)

            let wordLimit = 300;
            let truncatedContent = block.content_html.split(' ').slice(0, wordLimit).join(' ');
            if (block.content_html.split(' ').length > wordLimit) {
                truncatedContent += '...';
            }

            let textItem =
                `
            <li class="block-text">
                <p><em></em></p>
                <div>${truncatedContent}</div>
            </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', textItem);
        }


        // Links!
        // Links!
        // Links!
        else if (block.class == 'Link') {
            console.log(block)
            let linkItem =
                `
            <li class="block-media block-link">

                <figure class="container">
                    <p><em></em></p>
                    <picture>
                        <img src="${ block.image.large.url }">
                    </picture>
                </figure>

                <button class="open"></button>

                <div class="link-content">
                        <h3>${ block.title }</h3>
                        <h4>${ block.description_html }</h4>
                        <h5><a href="${ block.source.url }">View more ↗</a></h5>
                        <button class="close">Close</button>
                </div>
              
            </li>
            `;

            channelBlocks.insertAdjacentHTML('beforeend', linkItem);
        }


        // Uploaded (not linked) media…
        else if (block.class == 'Attachment') {
            let attachment = block.attachment.content_type; // Save us some repetition

            // Uploaded videos!
            if (attachment.includes('video')) {
                // …still up to you, but we’ll give you the `video` element:
                let videoItem =
                    `
                <li class="block-media block-video">
                    <p><em></em></p>
                    <video controls src="${block.attachment.url}"></video>
                </li>
                `;
                channelBlocks.insertAdjacentHTML('beforeend', videoItem);
                // More on video, like the `autoplay` attribute:
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
            }

            // Uploaded PDFs!
            // Uploaded PDFs!
            // Uploaded PDFs!
            else if (attachment.includes('pdf')) {
                // …up to you!
                let pdfItem =
                    `
                <li class="block-media block-pdf">

                    <figure class="container">
                        <p><em></em></p>
                        <picture>
                            <img src="${ block.image.original.url }">
                        </picture>
                    </figure>

                    <button class="open"></button>

                        <div class="pdf-content">
                            <h3>${ block.title }</h3>
                            <h5><a href="${block.attachment.url}" target="_blank">View more ↗</h5>
                            <button class="close">Close</button>
                        </div>
                </li>
                `;
                channelBlocks.insertAdjacentHTML('beforeend', pdfItem);
            }

            // Uploaded audio!
            else if (attachment.includes('audio')) {
                // …still up to you, but here’s an `audio` element:
                let audioItem =
                    `
                <li class="block-media block-audio>
                    <p><em></em></p>
                    <audio controls src="${ block.attachment.url }"></video>
                </li>
                `;
                channelBlocks.insertAdjacentHTML('beforeend', audioItem);
                // More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
            }
        }

        // Linked media…
        else if (block.class == 'Media') {
            let embed = block.embed.type;

            // Linked video!
            // Linked video!
            // Linked video!
            if (embed.includes('video')) {
        
                // …still up to you, but here’s an example `iframe` element:
                let linkedVideoItem =
                    `
                <li class="block-media block-linked-video">
                    <figure class="container video-container">
                        <p><em></em></p>
                        ${ block.embed.html }
                    </figure>
                </li>
                `;
                channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem);
                // More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
            }

        }


    };

    // It‘s always good to credit your work:
    let renderUser = (user, container) => { // You can have multiple arguments for a function!
        let userAddress =
            `
        <address class="profile">
            <img src="${ user.avatar_image.display }">
            <h3>${ user.first_name }</h3>
            <p><a href="https://are.na/${ user.slug }">Are.na profile ↗</a></p>
        </address>
        `;
        container.insertAdjacentHTML('beforeend', userAddress);
    };


    // Now that we have said what we can do, go get the data:
    fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
        .then((response) => response.json()) // Return it as JSON data
        .then((data) => { // Do stuff with the data
            console.log(data); // Always good to check your response!
            placeChannelInfo(data); // Pass the data to the first function

            // Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
            data.contents.reverse().forEach((block) => {
                // console.log(block) // The data for a single block
                renderBlock(block); // Pass the single block data to the render function
            });

            // Also display the owner and collaborators:
            let channelUsers = document.getElementById('channel-users'); // Show them together
            data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers));
            renderUser(data.user, channelUsers);


            // Set up our variables.
                let openButtonsLink = document.querySelectorAll('.block-link button.open')
                    openButtonsLink.forEach((openButton) => {
                        openButton.onclick = () => {
                            let parentBlock = openButton.parentElement
                            parentBlock.classList.toggle('active')
                        };
            })

                let closeButtonsLink = document.querySelectorAll('.block-link button.close')
                        closeButtonsLink.forEach((closeButton) => {
                            closeButton.onclick = () => {
                                let parentBlock = closeButton.parentElement.parentElement
                                parentBlock.classList.toggle('active')
                            };
                })

                let openButtonsPdf = document.querySelectorAll('.block-pdf button.open')
                    openButtonsPdf.forEach((openButton) => {
                        openButton.onclick = () => {
                            let parentBlock = openButton.parentElement
                            parentBlock.classList.toggle('active')
                        };
            })

                let closeButtonsPdf = document.querySelectorAll('.block-pdf button.close')
                        closeButtonsPdf.forEach((closeButton) => {
                            closeButton.onclick = () => {
                                let parentBlock = closeButton.parentElement.parentElement
                                parentBlock.classList.toggle('active')
                            };
                })

               
            

           
        });

       

     


});



       