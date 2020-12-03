var request = new XMLHttpRequest()

function program(page) {
    console.log("PENIS")

    // Get the input from the search bar
    let input = document.getElementById('searchBar').value
    input = input.replace(/\s+/g, '-').toLowerCase();

    // Create the request with the proper uri and headers
    request.open("GET", "https://api.discogs.com/database/search?title=" + input + "&page=" + page + "&per_page=100", true)
    request.setRequestHeader("User-Agent", "Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app");
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

                const result = document.createElement("div")
                result.setAttribute("id", "result")

                const photoContainer = document.createElement("div")
                photoContainer.setAttribute("id", "result-photo")

                const photo = document.createElement("img")
                photo.setAttribute("src", element.thumb)

                const text = document.createElement("div")
                text.setAttribute("id", "result-text")

                // Create elements for masters and releases
                if (element.type !== "artist") {
                    var splitHere = element.title.indexOf(" - ")

                    const title = document.createElement("div")
                    title.setAttribute("id", "result-title")
                    title.textContent = element.title.slice(splitHere + 3)

                    const artist = document.createElement("div")
                    artist.setAttribute("id", "result-title-info")
                    artist.textContent = element.title.slice(0, splitHere)

                    text.appendChild(artist)
                    text.appendChild(title)
                }
                else {
                    // Sets the artist tag
                    const title = document.createElement("div")
                    title.setAttribute("id", "result-title")
                    title.textContent = element.title

                    text.appendChild(title)
                }

                photoContainer.appendChild(photo)

                result.appendChild(text)
                result.appendChild(photoContainer)

                container.appendChild(result)

                app.appendChild(container)
            }
        });

        // Below recursively accesses the next pages
        if (lastPage !== undefined) {
            var nextPageNumber = nextPage.match("page=([0-9]+)")[1]
            var lastPageNumber = lastPage.match("page=([0-9]+)")[1]
            if (page <= lastPageNumber) {
                program(nextPageNumber)
            }
        }
    }
    // Send out the request
    request.send()
    return null
}
