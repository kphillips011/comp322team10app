

function loadSongs(songs) {
    var results = document.getElementById("SongResults");
    for(var song of songs) {
        
        var item = createSongHtml(song);
        results.appendChild(item);
    }
}

function createSongHtml(song) {
    //create elements
    var resultContainer = document.createElement("div");
    resultContainer.className = "result-container";

    resultContainer.setAttribute("songtitle", song.Title);
    resultContainer.setAttribute("songartist", song.Artist);
    resultContainer.onclick = songPopup;

    var result = document.createElement("div");
    result.id = "result";
    
    
    //image will be added later 
    // var resultPhoto = document.createElement("div");
    // resultPhoto.id = "result-photo";

    // var photo = document.createElement("p");
    // photo.innerHTML = "Photo";

    var resultText = document.createElement("div");
    resultText.id = "result-text";

    var resultTitle = document.createElement("div");
    resultTitle.id = "result-title";

    var title = document.createElement("p");
    title.innerHTML = song.Title;

    var infoDiv = document.createElement("div");
    infoDiv.id = "result-title-info";

    var info = document.createElement("p");
    info.innerHTML = song.Artist;

    //combine elements together
    // resultPhoto.appendChild(photo);
    resultTitle.appendChild(title);
    infoDiv.appendChild(info);
    resultText.appendChild(resultTitle);
    resultText.appendChild(infoDiv);
    // result.appendChild(resultPhoto);
    result.appendChild(resultText);
    resultContainer.appendChild(result);

    return resultContainer;
}

$(document).ready(function() {
    $("#addSong").submit(function(e) {
        e.preventDefault();
        let name = $("#songTitle").val().trim();
        let artist = $("#artistName").val().trim();
        let id = window.localStorage.getItem("uid");
        addSong(name, artist,id);
        $("#songTitle").val("")
        $("#artistName").val("")
        $("#addSongPopup").popup("close");
    })
});

function addSong(title, artist, playlistId) {
    var db = firebase.firestore();
    var playlistref = db.collection("Playlist").doc(playlistId);
    let song = {Artist:artist, Title:title};
    var results = document.getElementById("SongResults");

    playlistref.update({
        Songs: firebase.firestore.FieldValue.arrayUnion(song)
    });
    //updatePlaylists();
    //console.log(userAlbums);
    let item = createSongHtml(song);
    results.appendChild(item);
   
}

function updatePlaylists() {
    var user = firebase.auth().currentUser;

    var query = userPlaylistsQuery(user.uid);
    query.get().then(function(querySnapshot) {
        userPlaylists = querySnapshot;
        //alert("update");
    })
}

function deleteSong(song) {
    //var results = document.getElementById("SongResults");
    var db = firebase.firestore();
    let id = window.localStorage.getItem("uid");
    var playlistref = db.collection("Playlist").doc(id);

    playlistref.update({
        Songs: firebase.firestore.FieldValue.arrayRemove(song)
    });
    deleteSongHtml(song);
    //updatePlaylists();
    
    
}

function deleteSongHtml(song) {
    $(".result-container").each(function() {
        if(this.getAttribute("songtitle")==song.Title && this.getAttribute("songartist")== song.Artist) {
            this.remove();
        }
    })
}


function songPopup() {
    let song = {Title:this.getAttribute("songtitle"),Artist:this.getAttribute("songartist")};
    var isPlaylist = window.localStorage.getItem("isPlaylist");
    $("#songOptionsTitle").text(song.Title + " Options");
    //todo view
    if (isPlaylist) {
        $("#deleteSong").show();
        $("#deleteSong").attr("songtitle", song.Title);
        $("#deleteSong").attr("songartist", song.Artist);
    } else {
        $("#deleteSong").hide();
    }
    

    $("#songOptionsPopup").popup( "option", "positionTo", "window" );
    $("#songOptionsPopup").popup("open");
}

$(document).ready(function() {
    $("#deleteSong").on("click", function() {
        backButton = false;
        let song = {Title:this.getAttribute("songtitle"),Artist:this.getAttribute("songartist")};
        deleteSong(song);
        //updatePlaylists();
        $("#songOptionsPopup").popup("close");
    });
});

function loadImage(img) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var albumArtRef = storageRef.child('albumArt');
    var imageRef = albumArtRef.child(img);

    var image = document.createElement("img");
    

    imageRef.getDownloadURL().then(function(url) {
       image.src = url;
       $("#albumImageContainer").append(image);
       
       
    }).catch(function(error) {
        console.log(error);
    });

}

function uploadImage() {
    //alert(src);
    var date = new Date().toString();
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imageRef = storageRef.child('scannedImages');
    //var image = imageRef.child(date);
    // var xhr = new XMLHttpRequest();       
    // xhr.open("GET", "../img/login.png", true); 
    // xhr.responseType = "blob";
    // xhr.onload = function (e) {
    //         console.log(this.response);
    //         var reader = new FileReader();
    //         reader.onload = function(event) {
    //            var res = event.target.result;
    //            console.log(res)
               
    //         }
    //         var file = this.response;
    //         var uploadTask = imageRef.child( date).put(file,metadata);
    //         reader.readAsDataURL(file)
    // };
    // xhr.send()
    //var test = base64_encode("../img/continue.png")
    //var image = imageRef.child(date);
    // var photo = document.createElement("img");
    // photo.src = 'img/login.png';
    // photo.id = 'phgoto';
    // photo.onload = function() {
    // alert("dte")
    // image.putString(src, 'base64url').then(function(snapshot) {
    //     console.log("uploaded image");
    //     alert("worked");
    // })   
        
    // }
    //$("#homePage").append(photo);
    //cordova.plugins.firebase.upload.uploadFile('img/login.png','scannedImages/test2123').then(function(path){
        //URL of file in firebase storage
    //});
    const file = $('#photo').get(0).files[0];
    var metadata = {
        contentType: 'image/png'
      };
    var uploadTask = imageRef.child( date).put(file,metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
  });
});
    
}


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}