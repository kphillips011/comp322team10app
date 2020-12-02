function search(title) {
    var myHeaders = new Headers();
    myHeaders.append("User-Agent", " Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app");
    myHeaders.append("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.discogs.com/database/search?title=" + title + "&per_page=100", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

search("fall out boy")
