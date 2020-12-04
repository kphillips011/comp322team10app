
function resultsPopup() {
    //let song = {Title:this.getAttribute("songtitle"),Artist:this.getAttribute("songartist")};
    let title = this.getAttribute("resulttitle");
    let id = this.getAttribute("uid");
    let isPlaylist = this.getAttribute("isplaylist");
    
    // var isPlaylist = window.localStorage.getItem("isPlaylist");
    $("#resultOptionsTitle").text(title + " Options");
    //todo view
    $("#viewResults").attr("uid",id);
    $("#viewResults").attr("isplaylist",isPlaylist);
    $("#viewResults").attr("name",title);
    $("#viewResults").attr("isresult", "true");
    document.getElementById("viewResults").onclick = openAlbumPageFromResults;
    

    $("#resultOptionsPopup").popup( "option", "positionTo", "window" );
    $("#resultOptionsPopup").popup("open");
}
var albums,
    playlists;
$(document).on("pageshow","#resultsPage", function(e, data) {
   
    
    $('#resultsList').empty();

    

    var results = document.getElementById("resultsList");
    // var result = {
    //     "Title": 'Album',
    //     "uid": 'xaqews31Ags',
    //     "isPlaylist": "false",
    //     "Artist": "George"
    // };
    //temporary query
    var db = firebase.firestore();
    var albumRef = db.collection("Album");
    albumRef.get().then(function(querySnapshot) {
        albums = querySnapshot;
        albums.forEach(function(album) {
            let item = createResultHtml(album, false);
            results.appendChild(item);
            if("Image" in album.data()) {
                loadResultsImage(album.data().Image,album.id );
            }
        })
    });
    var playlistRef = db.collection("Playlist");
    playlistRef.get().then(function(querySnapshot) {
        playlists = querySnapshot;
        playlists.forEach(function(playlist) {
            let item = createResultHtml(playlist, true);
            results.appendChild(item);
            if("Image" in playlist.data()) {
                loadResultsImage(playlist.data().Image,playlist.id );
            }
        })
    })

    
    // let item = createResultHtml(result);
    // results.appendChild(item);
});

function createResultHtml(result, isPlaylist) {
    //create elements
    //console.log(result);
    var resultContainer = document.createElement("div");
    resultContainer.className = "result-container";

    resultContainer.setAttribute("resulttitle", result.data().Name);
    resultContainer.setAttribute("uid", result.id);
    resultContainer.setAttribute("isplaylist", isPlaylist);
    resultContainer.onclick = resultsPopup;

    var resultItem = document.createElement("div");
    resultItem.id = "result";
    
    
    //image will be added later 
    var resultPhoto = document.createElement("div");
    resultPhoto.id = "result-photo";

    //var photo = document.createElement("img");
    // if ("Image" in result.data()) {
    //     loadResultsImage(result.data().Image,result.id );

    // }
    //photo.src="./img/1-2.png"
    //photo.innerHTML = "Photo";
    

    var resultText = document.createElement("div");
    resultText.id = "result-text";

    var resultTitle = document.createElement("div");
    resultTitle.id = "result-title";
    //console.log(result.Title);
    var title = document.createElement("p");
    title.innerHTML = result.data().Name;

    var infoDiv = document.createElement("div");
    infoDiv.id = "result-title-info";

    var info = document.createElement("p");
    info.innerHTML = result.data().Artist;

    //combine elements together
    //resultPhoto.appendChild(photo);
    resultTitle.appendChild(title);
    infoDiv.appendChild(info);
    resultText.appendChild(resultTitle);
    resultText.appendChild(infoDiv);
    resultItem.appendChild(resultPhoto);
    resultItem.appendChild(resultText);
    resultContainer.appendChild(resultItem);

    return resultContainer;
}

function openAlbumPageFromResults() {
    let id = this.getAttribute("uid");
    let isPlaylist = this.getAttribute("isplaylist");
    let name = this.getAttribute("name");
    let isResult = this.getAttribute("isresult");
    window.localStorage.setItem("uid", id);
    window.localStorage.setItem("isPlaylist", isPlaylist);
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("isresult", isResult);
    $.mobile.changePage($("#albumPage"));
}

function loadResultsImage(img, id) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var albumArtRef = storageRef.child('albumArt');
    var imageRef = albumArtRef.child(img);

    var image = document.createElement("img");
    

    imageRef.getDownloadURL().then(function(url) {
        //console.log(url)
        image.src = url;
        $(".result-container").each(function() {
            if(this.getAttribute("uid") == id) {
                var items = this.childNodes;
                for(var div of items) {
                    for (var photodiv of div.childNodes) {
                        if (photodiv.id == "result-photo") {
                            //console.log(photodiv);
                            photodiv.appendChild(image);
                        }
                    }
                    
                }
                // item.append(image);
                //console.log(item);
            }
        })
       
       
    }).catch(function(error) {
        console.log(error);
    });

}