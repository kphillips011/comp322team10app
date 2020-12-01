// $.getJSON(
// "https://api.discogs.com/artists/1?callback=callbackname", //ik you put the token or access key in here at the end somehow
// function(data) {
//     console.log(data);

//     var name = data.name;

//     $(".name").attr("src, name");
// });

const api_url = "https://api.discogs.com/artists/1?callback=callbackname&per_page=100";
async function getAlbum() {
    const response = await fetch(api_url);
    const data = await resonse.json();
    console.log(data);
}

getAlbum();
