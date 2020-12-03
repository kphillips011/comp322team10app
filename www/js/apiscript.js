function search(title) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", "Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app");
    myHeaders.append("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var res = fetch("https://api.discogs.com/database/search?title=" + title + "&per_page=100", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    // const json = res;
    // const obj = JSON.parse(json);
    // console.log(obj.title);
    // console.log(obj.cover_image);
    // console.log(obj.thumb);

}


program("https://api.discogs.com/database/search?title=" + title + "&per_page=100")

var request = new XMLHttpRequest()

function program(title) {
    request.open("GET", "https://api.discogs.com/database/search?title=" + title + "&per_page=100", true)

    request.setRequestHeader("User-Agent", "Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app");

    request.setRequestHeader("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY")

    request.onload = function () {
        console.log(JSON.parse(this.response))
    }
    // request.onload = function () {
    //     response = JSON.parse(this.response)
    //     var next = nextPage(request.getResponseHeader("Link"))
    //     if (next == null) {
    //         return null
    //     }
    //     else {
    //         program(next)
    //         return null
    //     }
    // }
    request.send()
    return null
}

program("fall out boy")
