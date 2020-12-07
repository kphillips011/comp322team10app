var request = new XMLHttpRequest()

function generalSearch(page) {
    // Get the input from the search bar
    let input = document.getElementById('searchBar').value
    input = input.replace(/\s+/g, '-').toLowerCase();

    // Create the request with the proper uri and headers
    request.open("GET", "https://api.discogs.com/database/search?title=" + input + "&page=" + page + "&per_page=100", true)
    request.setRequestHeader("User-Agent", "VinylBase");
    request.setRequestHeader("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY")

    // Once there is a response from the server...
    request.onload = function () {

        // Turn the response into JSON
        json = JSON.parse(this.response)

        // Pull specific data from the JSON
        results = json.results
        var lastPage = json.pagination.urls.last
        var nextPage = json.pagination.urls.next

        // Root HTML
        const app = document.getElementById("results")

        // Clear all child HTML
        app.innerHTML = ""

        // Creates  content from the response
        results.forEach(element => {
            // Create HTML if the data type is not a label
            if (element.type !== "label") {
                // Build the elements
                const container = document.createElement("div")
                container.setAttribute("class", "result-container")

                const link = document.createElement("a")

                const result = document.createElement("div")
                result.setAttribute("id", "result")

                const photoContainer = document.createElement("div")
                photoContainer.setAttribute("id", "result-photo")

                const photo = document.createElement("img")
                photo.setAttribute("src", element.thumb)
                photo.setAttribute("style", "display: block; margin-left: auto; margin-right: auto; ")

                const text = document.createElement("div")
                text.setAttribute("id", "result-text")

                // Create elements for masters and releases
                if (element.type !== "artist") {
                    var splitHere = element.title.indexOf(" - ")

                    const artist = document.createElement("div")
                    artist.setAttribute("id", "result-artist")
                    artist.textContent = element.title.slice(0, splitHere)

                    const alublm = document.createElement("div")
                    alublm.setAttribute("id", "result-alublm")
                    alublm.textContent = element.title.slice(splitHere + 3)

                    var linkArgs = 'albulmParse("' + element.master_url + '", "' + element.thumb + '", "' + element.title.slice(0, splitHere) + '", "' + element.title.slice(splitHere + 3) + '")'

                    if (element.master_url == null) {
                        link.setAttribute("style", "color: black;")
                    }
                    else {
                        link.setAttribute("onclick", linkArgs)
                    }

                    text.appendChild(artist)
                    text.appendChild(alublm)
                }
                // Create elements for artists
                else {
                    const artist = document.createElement("div")
                    artist.setAttribute("id", "result-artist")
                    artist.textContent = element.title

                    link.setAttribute("style", "color: black;")

                    text.appendChild(artist)
                }

                photoContainer.appendChild(photo)

                result.appendChild(text)
                result.appendChild(photoContainer)

                link.appendChild(result)

                container.appendChild(link)

                app.appendChild(container)
            }
        });

        // Below recursively accesses the next pages
        if (lastPage !== undefined) {
            var nextPageNumber = nextPage.match("page=([0-9]+)")[1]
            var lastPageNumber = lastPage.match("page=([0-9]+)")[1]
            if (page <= lastPageNumber) {
                generalSearch(nextPageNumber)
            }
        }
    }
    // Send out the request
    request.send()
    return null
}

function albulmParse(url, imageURL, artist, albulm) {
    console.log(url)

    request.open("GET", url, true)
    request.setRequestHeader("User-Agent", "VinylBase");
    request.setRequestHeader("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY")

    // Once there is a response from the server...
    request.onload = function () {

        // Turn the response into JSON
        json = JSON.parse(this.response)

        // Pull specific data from the JSON
        var tracklist = json.tracklist

        // Root HTML
        const app = document.getElementById("results")

        // Clear all child HTML
        app.innerHTML = ""

        // Creates  content from the response
        tracklist.forEach(element => {

            const container = document.createElement("div")
            container.setAttribute("class", "result-container")

            const result = document.createElement("div")
            result.setAttribute("id", "result")

            const photoContainer = document.createElement("div")
            photoContainer.setAttribute("id", "result-photo")

            const photo = document.createElement("img")
            photo.setAttribute("src", imageURL)
            photo.setAttribute("style", "display: block; margin-left: auto; margin-right: auto; ")

            const text = document.createElement("div")
            text.setAttribute("id", "result-text")

            // Create elements for tracks
            const artist_elem = document.createElement("div")
            artist_elem.setAttribute("id", "result-artist")
            artist_elem.textContent = artist

            const alublm = document.createElement("div")
            alublm.setAttribute("id", "result-alublm")
            alublm.textContent = albulm

            const song = document.createElement("div")
            song.setAttribute("id", "result-song")
            song.textContent = element.title

            text.appendChild(artist_elem)
            text.appendChild(alublm)
            text.appendChild(song)

            photoContainer.appendChild(photo)

            result.appendChild(text)
            result.appendChild(photoContainer)

            container.appendChild(result)

            app.appendChild(container)
        });
    }

    request.send()
    return null
}
function artistParse(url) { return null }
