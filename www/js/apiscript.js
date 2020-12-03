var request = new XMLHttpRequest()

function program(artist, page) {

    request.open("GET", "https://api.discogs.com/database/search?artist=" + artist + "&page=" + page + "&per_page=100", true)

    request.setRequestHeader("User-Agent", "Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app");

    request.setRequestHeader("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY")

    request.onload = function () {
        json = JSON.parse(this.response)

        // Below prints the first 100 results for a search on the artists name

        console.log(json.results)

        // Below recursively accesses the extra pages for a search
        var lastPage = json.pagination.urls.last
        var nextPage = json.pagination.urls.next

        if (lastPage !== undefined) {
            var nextPageNumber = nextPage.match("page=([0-9]+)")[1]
            var lastPageNumber = lastPage.match("page=([0-9]+)")[1]
            if (page <= lastPageNumber) {
                program(artist, nextPageNumber)
            }
        }

    }
    request.send()
    return null
}

program("fall out boy", 1)
