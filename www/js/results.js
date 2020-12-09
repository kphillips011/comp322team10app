
function resultsPopup() {
    //let song = {Title:this.getAttribute("songtitle"),Artist:this.getAttribute("songartist")};
    let title = this.getAttribute("resulttitle");
    let id = this.getAttribute("uid");
    let isPlaylist = this.getAttribute("isplaylist");
    let artist = this.getAttribute("artist");
    // var isPlaylist = window.localStorage.getItem("isPlaylist");
    $("#searchoptionsTitle").text(title + " Options");
    //todo view
    $("#viewsearchItem").attr("uid",id);
    $("#viewsearchItem").attr("isplaylist",isPlaylist);
    $("#viewsearchItem").attr("name",title);
    $("#viewsearchItem").attr("isresult", "true");
    document.getElementById("viewsearchItem").onclick = openAlbumPageFromResults;
    
    $("#addItem").attr("uid",id);
    $("#addItem").attr("isplaylist",isPlaylist);
    $("#addItem").attr("name",title);
    $("#addItem").attr("artist",artist);
    $("#addItem").attr("isresult", "true");
    document.getElementById("addItem").onclick = addAlbum;

    $("#searchoptionsPopup").popup( "option", "positionTo", "window" );
    $("#searchoptionsPopup").popup("open");
}

function addAlbum() {
    let id = this.getAttribute("uid");
    let isPlaylist = this.getAttribute("isplaylist");
    let name = this.getAttribute("name");
    let artist = this.getAttribute("artist");
    let isResult = this.getAttribute("isresult");
    var db = firebase.firestore();
    var albumRef = db.collection("Album");
    var user = firebase.auth().currentUser;
    // albumRef.where("Artist", "==", artist).where("Name", "==", name).get().then(function(querySnapshot) {
    //     querySnapshot.forEach(function(document) {
    //         db.collection('users').doc(user.uid).update({
    //             Albums:firebase.firestore.FieldValue.arrayUnion(document.id)
    //         })
    //     })
        
    // }).catch(function(error) {
    //     console.log(error)
    //     albumRef.add({
    //         Artist: artist,
    //         Name: name,
    //         Songs: [{Artist:artist, Title: name}]
    //     }).then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    //     db.collection('users').where("UserID", "==", user.uid).update({
    //         Albums:firebase.firestore.FieldValue.arrayUnion(docRef.id)
    //     })
    //     })
    //     .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //     });
    // })
    albumRef.add({
        Artist: artist,
        Name: name,
        Songs: [{Artist:artist, Title: name}],
        UserID: user.uid
    })
    $("#searchoptionsPopup").popup("close");
    //$.mobile.changePage($("#albumPage"));
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
                            if (photodiv.childNodes.length == 0) {
                                photodiv.appendChild(image);
                            }

                            //console.log(photodiv);
                            
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