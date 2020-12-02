
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
    document.getElementById("viewResults").onclick = openAlbumPageFromResults;
    

    $("#resultOptionsPopup").popup( "option", "positionTo", "window" );
    $("#resultOptionsPopup").popup("open");
}

$(document).on("pageshow","#resultsPage", function(e, data) {
    var result = {
        "Title": 'Album',
        "uid": 'xaqews31Ags',
        "isPlaylist": "false",
        "Artist": "George"
    };


    var results = document.getElementById("resultsList");
    let item = createResultHtml(result);
    results.appendChild(item);
});

function createResultHtml(result) {
    //create elements
    console.log(result.Title);
    var resultContainer = document.createElement("div");
    resultContainer.className = "result-container";

    resultContainer.setAttribute("resulttitle", result.Title);
    resultContainer.setAttribute("uid", result.uid);
    resultContainer.setAttribute("isplaylist", result.isPlaylist);
    resultContainer.onclick = resultsPopup;

    var resultItem = document.createElement("div");
    resultItem.id = "result";
    
    
    //image will be added later 
    var resultPhoto = document.createElement("div");
    resultPhoto.id = "result-photo";

    var photo = document.createElement("p");
    photo.innerHTML = "Photo";

    var resultText = document.createElement("div");
    resultText.id = "result-text";

    var resultTitle = document.createElement("div");
    resultTitle.id = "result-title";
    console.log(result.Title);
    var title = document.createElement("p");
    title.innerHTML = result.Title;

    var infoDiv = document.createElement("div");
    infoDiv.id = "result-title-info";

    var info = document.createElement("p");
    info.innerHTML = result.Artist;

    //combine elements together
    resultPhoto.appendChild(photo);
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
    window.localStorage.setItem("uid", id);
    window.localStorage.setItem("isPlaylist", isPlaylist);
    window.localStorage.setItem("name", name);
    $.mobile.changePage($("#albumPage"));
}