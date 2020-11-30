
//will contain functions like delete, create,


function logout() {
    firebase.auth().signOut().then(() => {
        alert("User Logged Out");
        $.mobile.changePage($("#login_page"));
    })
}

var userPlaylists,
    userAlbums;

$(document).ready(function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            alert("grabbed userID")
            window.localStorage.setItem("userID", user.uid);
            $.mobile.changePage($("#homePage"));
        }
        else {
            // User is signed out
            // ...
        }
    });
});



function userPlaylistsQuery(UserID) {
    var db = firebase.firestore();
    //alert("loaded user" + uid);
    var platlistsRef = db.collection("Playlist");
    var userPlaylistsQuery = platlistsRef.where("UserID", "==", UserID);
    return userPlaylistsQuery;
}

function userAlbumsQuery(UserID) {
    //might be moved out so it doesnt need to be recalled ever query
    var db = firebase.firestore();
    
    var AlbumsRef = db.collection("Album");
    var userAlbumsQuery = AlbumsRef.where("UserID", "==", UserID);
    return userAlbumsQuery;
}

function populateAlbums(UserID) {
    var query = userAlbumsQuery(UserID);

    var albumsDiv = document.getElementById("Albums");

    query.get().then(function(querySnapshot) {
        userAlbums = querySnapshot;
        userAlbums.forEach(function (doc) {
            var link = createAlbumLink(doc);

            albumsDiv.appendChild(link);

        }) 
    })
    .catch(function(error) {
        console.log(error);
    })
}

function createAlbumLink(album) {
    var link = document.createElement("a");
    
    link.innerHTML = album.data().Name;
    link.className = "textbutton";
    link.setAttribute("uid", album.id);
    link.setAttribute("isplaylist", false);
    link.onclick = test;

    return link;
}


function populatePlaylist(playlist) {
    var playlistsDiv = document.getElementById("Playlists");
    
    var link = document.createElement('a');
    // adding attributes to link
    link.innerText = playlist.data().Name;
    link.className = "textbutton playlistButton";
    link.id = "playlistLink";
    link.setAttribute("uid", playlist.id);
    link.setAttribute("isplaylist", true);
    link.onclick = test;
    //console.log(link.href);
    playlistsDiv.appendChild(link);
}

//this code will only run when the homePage is being loaded

$(document).on("pagebeforeshow", "#homePage", function () {
    //alert('This page was just hidden: ');
    //console.log(userPlaylists);
    var uid = window.localStorage.getItem("userID");
    if (userPlaylists == undefined) {
        

        var query = userPlaylistsQuery(uid);
        //alert(uid);
        //alert(userPlaylists);
        
        query.get()
            .then(function (querySnapshot) {
                userPlaylists = querySnapshot;
                userPlaylists.forEach(function (doc) {
                    //var playlist = doc.data();
                    //console.log(playlist.Songs[0].Name);
                    populatePlaylist(doc);
                });
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    else {
        //not sure if necesary but i dont want the code above reruning every time
        //might need code here if a playlist is added via add button/scan album
    }

    if (userAlbums == undefined) {
        populateAlbums(uid);
    }
});

// $(".playlistButton").on("click", function(e) {
//     e.preventDefault();
//     window.localStorage.setItem("uid", this.getAttribute("uid"));
//     window.localStorage.setItem("isPlaylist", this.getAttribute("isplaylist"));
//     $.mobile.changePage($("#albumPage"));
// })

function test() {
    //adding uid from element to local storage so the loaded page can grab it
    //alert("test")
    window.localStorage.setItem("uid", this.getAttribute("uid"));
    window.localStorage.setItem("isPlaylist", this.getAttribute("isplaylist"));
    $.mobile.changePage($("#albumPage"));
    
}
$(document).ready(function() {
    $("#resetPassword").submit(function(e) {
        e.preventDefault();
        var newPass = $("#newPass").val().trim();
        var confrimPass = $("#conPass").val().trim();
        if(newPass == confrimPass) {
            var user = firebase.auth().currentUser;
            user.updatePassword(newPass).then(function() {
                alert("password reset");
                $("#popupPassword").popup("close");
            }).catch(function(error) {
                alert(error);
                if (error.code == 'auth/requires-recent-login') {
                    $("#reAuthPopup").popup( "option", "positionTo", "window" );
                    $("#reAuthPopup").popup("open");
                    //todo sumbit code for reauth
                }
                $("#newPass").val("");
                $("#conPass").val("");
            })
        }
        else {
            $("#newPass").val("");
            $("#conPass").val("");
            alert("Passwords dont match");
        }
        
        
        //$.mobile.changePage($("#settingsPage"));
        
        return true;
    });
});

$(document).on("pageshow","#settingsPage", function() {

});
