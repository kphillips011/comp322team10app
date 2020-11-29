

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

    var result = document.createElement("div");
    result.id = "result";
    //image will be added later 
    var resultPhoto = document.createElement("div");
    resultPhoto.id = "result-photo";

    var photo = document.createElement("p");
    photo.innerHTML = "Photo";

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
    resultPhoto.appendChild(photo);
    resultTitle.appendChild(title);
    infoDiv.appendChild(info);
    resultText.appendChild(resultTitle);
    resultText.appendChild(infoDiv);
    result.appendChild(resultPhoto);
    result.appendChild(resultText);
    resultContainer.appendChild(result);

    return resultContainer;
}

