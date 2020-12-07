
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
            $.mobile.changePage($("#login_page"));
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
    link.onclick = generateOptionsPopup;

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
    
    link.onclick = generateOptionsPopup;
    //console.log(link.href);
    playlistsDiv.appendChild(link);
}


//this code will only run when the homePage is being loaded
$(document).on("pageshow", "#homePage", function () {
    //alert('This page was just hidden: ');
    //console.log(userPlaylists);
    //alert("loading home");
    //var uid = window.localStorage.getItem("userID");
    firebase.auth().onAuthStateChanged(function(user) {
        if (userPlaylists == undefined) {
            //var user = firebase.auth().currentUser;
            var query = userPlaylistsQuery(user.uid);
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
            populateAlbums(user.uid);
        }
    })
    backButton = false;
});

// $(".playlistButton").on("click", function(e) {
//     e.preventDefault();
//     window.localStorage.setItem("uid", this.getAttribute("uid"));
//     window.localStorage.setItem("isPlaylist", this.getAttribute("isplaylist"));
//     $.mobile.changePage($("#albumPage"));
// })

// function test() {
//     //adding uid from element to local storage so the loaded page can grab it
//     //alert("test")
//     window.localStorage.setItem("uid", this.getAttribute("uid"));
//     window.localStorage.setItem("isPlaylist", this.getAttribute("isplaylist"));
//     $.mobile.changePage($("#albumPage"));
    
// }
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
                    //open reauthentication window
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

$(document).ready(function() {
    $("#setNewEmail").submit(function(e) {
        e.preventDefault();
        var newEmail = $("#newEmail").val().trim();
        var confrimEmail = $("#confirmEmail").val().trim();
        if(newEmail == confrimEmail) {
            var user = firebase.auth().currentUser;
            user.updateEmail(newEmail).then(function() {
                alert("New Email Set");
                $("#newEmailPopup").popup("close");
                $("#emailLine").text("Email: "+ newEmail);
            }).catch(function(error) {
                alert(error);
                if (error.code == 'auth/requires-recent-login') {
                    //open reauthentication window
                    $("setNewEmail").popup("close");
                    $("#reAuthPopup").popup( "option", "positionTo", "window" );
                    $("#reAuthPopup").popup("open");
                    //todo sumbit code for reauth
                }
                $("#newEmail").val("");
                $("#confirmEmail").val("");
            })
        }
        else {
            $("#newEmail").val("");
            $("#confirmEmail").val("");
            alert("Passwords dont match");
        }
        
        
        //$.mobile.changePage($("#settingsPage"));
        
        return true;
    });
});

function cancleDelete() {
    $("#deletePopup").popup("close");
}

function deleteUser() {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
        alert("Account Deleted");
        //go back to login
        $.mobile.changePage($("#login_Page"));
    }).catch(function(error) {
        alert(error)
        //reauth
    });
}

$(document).on("pageshow","#settingsPage", function() {
    var user = firebase.auth().currentUser;
    
    if(user) {
        var email = user.email;
        
        $("#emailLine").text("Email: "+ email);
    } else {

    }
});


function generateOptionsPopup() {
    let id = this.getAttribute("uid");
    let isPlaylist = this.getAttribute("isplaylist");
    let name = this.innerHTML;
    
    
    $("#optionsTitle").text(name + " Options");
    $("#optionsPopup").popup("open");

    $("#viewItem").attr("uid",id);
    $("#viewItem").attr("isplaylist",isPlaylist);
    $("#viewItem").attr("name",name);

    $("#deleteItem").attr("uid",id);
    $("#deleteItem").attr("isplaylist",isPlaylist);
    //$("#viewItem").attr("onclick",viewButton);

}



$(document).ready(function() {
    $("#viewItem").on("click", function() {
        backButton = false;
        let id = this.getAttribute("uid");
        let isPlaylist = this.getAttribute("isplaylist");
        let name = this.getAttribute("name");
        window.localStorage.setItem("uid", id);
        window.localStorage.setItem("isPlaylist", isPlaylist);
        window.localStorage.setItem("name", name);
        $.mobile.changePage($("#albumPage"));
    });
});

$(document).ready(function() {
    $("#deleteItem").on("click", function() {
        backButton = false;
        let id = this.getAttribute("uid");
        let isPlaylist = this.getAttribute("isplaylist");
        
        deleteItem(id, isPlaylist);
        $("#optionsPopup").popup("close");
    });
})

function deleteItem(id, isPlaylist) {
    var db = firebase.firestore();
    if(isPlaylist == "true") {
        db.collection("Playlist").doc(id).delete()
        .then(function() {
            alert("Playlist deleted");
            deletePlaylist(id);
        }).catch(function(error) {
            alert(error);
        });
    }
    else {
        db.collection("Album").doc(id).delete()
        .then(function() {
            alert("Album deleted");

        }).catch(function(error) {
            alert(error);
        });
    }
}

function deletePlaylist(id) {
    $(".playlistButton").each(function() {
        if(this.getAttribute("uid")==id) {
            this.remove();
        }
    })
}

function addPlaylist(name, author) {
    var user = firebase.auth().currentUser;

    var db = firebase.firestore();

    db.collection("Playlist").add({
        Name: name,
        UserID: user.uid,
        Artist: author,
        Songs:[]
    }).then(function(doc) {
        alert("Created "+ name);
        db.collection("Playlist").doc(doc.id).get().then(function(playlist) {
            populatePlaylist(playlist);
        }).catch(function(error) {
            alert(error);
        });
        
    }).catch(function(error) {
        console.log(error);
    });
}

$(document).ready(function() {
    $("#createPlaylist").submit(function(e) {
        e.preventDefault();
        let name = $("#playlistName").val().trim();
        let author = $("#playlistAuthor").val().trim();
        addPlaylist(name, author);
        $("#playlistName").val("");
        $("#createPlaylistPopup").popup("close");
    });
});

