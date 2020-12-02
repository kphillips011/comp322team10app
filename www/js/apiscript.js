// $.getJSON(
// "https://api.discogs.com/artists/1?callback=callbackname", //ik you put the token or access key in here at the end somehow
// function(data) {
//     console.log(data);

//     var name = data.name;

//     $(".name").attr("src, name");
// });

// const api_url = "https://api.discogs.com/database/search?q={query}&{?title,release_title,artist}&per_page=100";

/*
Needed information:

User-Agent: "Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app"

Authorization: "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY"

Paginatation uri = &per_page=100
*/

var myHeaders = new Headers();
myHeaders.append("User-Agent", " Comp322Project/1.0 +https://github.com/kphillips011/comp322team10app");
myHeaders.append("Authorization", "Discogs key=JzKHUoDrREtQgpMdkEdu, secret=gQCBQrBCupEnpDwdAmLkxlJhOGZiwidY");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://api.discogs.com/database/search?title=nirvana - nevermind&per_page=100", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
