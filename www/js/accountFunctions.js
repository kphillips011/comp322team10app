
//will contain functions like delete, create,


var userPlaylists;



//this code will only run when the homePage is being loaded

$(document).on("pagebeforeshow", "#homePage", function () {
    //alert('This page was just hidden: ');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if (jQuery.isEmptyObject(userPlaylists)) {
                var uid = user.uid;
                
                var db = firebase.firestore();
                //alert("loaded user" + uid);
                var platlistsRef = db.collection("Playlist");
                var userPlaylistsQuery = platlistsRef.where("UserID", "==", uid);
                //alert(uid);
                //alert(userPlaylists);
                var playlistsDiv = document.getElementById("Playlists");
                userPlaylistsQuery.get()
                .then(function(querySnapshot) {
                    userPlaylists = querySnapshot;
                    userPlaylists.forEach(function(doc) {
                        var playlist = doc.data();
                        console.log(playlist.Songs[0].Name);
                        var link = document.createElement('a');
                        //link.href = "#albumPage?id="+doc.id;
                        link.innerText = playlist.Name;
                        link.className = "textbutton";
                        link.id = "playlistLink";
                        link.setAttribute("uid",doc.id);
                        link.onclick = test;
                        console.log(link.href);
                        playlistsDiv.appendChild(link);
                    });
                })
                .catch(function(error) {
                    console.log( error);
                });
                
            }
            else {
                //not sure if necesary but i dont want the code above reruning every time
                //might need code here if a playlist is added via add button/scan album
            }
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            // ...
        } else {
            // User is signed out
            // ...
        }

    });
});

function test() {
    $(".textbutton").on("click", function() {
        //alert($("#playlistLink").attr("uid"));
        window.localStorage.setItem("uid", this.getAttribute("uid"));
        $.mobile.changePage($("#albumPage"), {data:{id:this.uid}});
        
    });
}
