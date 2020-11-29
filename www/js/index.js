/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    
    
}

// $(document).ready(function() {
    
//     var firebaseConfig = {
//         apiKey: "AIzaSyAn4mnjUdV95nmOJ_7C6HnORmMhUFw27xM",
//         authDomain: "vinylbase-7fe10.firebaseapp.com",
//         databaseURL: "https://vinylbase-7fe10.firebaseio.com",
//         projectId: "vinylbase-7fe10",
//         storageBucket: "vinylbase-7fe10.appspot.com",
//         messagingSenderId: "928999002977",
//         appId: "1:928999002977:web:477940107bc0169196eb20",
//         measurementId: "G-NZBN9PVLQX"
//       };
//       // Initialize Firebase
//       firebase.initializeApp(firebaseConfig);
//       firebase.analytics();
//       alert("firebase loaded");
// })

// $(document).ready(function(){
//     $("#testSignUp").on("click", function(){
//         if ($("#Pword").val().trim() === $("#confirmpassword").val().trim()) {
//             window.localStorage.setItem("key1", $("#uname").val().trim())
//             window.localStorage.setItem("key2", $("#Pword").val().trim())
//             window.localStorage.setItem("key3", $("#email").val().trim())
//             var email = $("#email").val().trim();
//             var password = $("#Pword").val().trim();
            
//             firebase.auth().createUserWithEmailAndPassword(email, password)
//             .then((user) => {
//                 alert("Sign Up sucessful.")
//             })
//             .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 alert(errorMessage);
//             })
            
//         }
//         else {
//             alert("Passowrds dont match");
//         }
//     });
// });
$(document).ready(function() {
    $("#Signup").submit(function() {
        
        if ($("#Pword").val().trim() === $("#confirmpassword").val().trim()) {
            var email = $("#email").val().trim();
                var password = $("#Pword").val().trim();
                
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    alert("Sign Up sucessful.")
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                })
        }
        else {
            alert("Passowrds dont match");
        }
    })
});


// $(document).ready(function(){
//     $("#testCred").on("click", function(){
//         if ($("#Loguname").val().trim() === "testUser" && $("#Logpword").val().trim() === "testPassword") {
//             alert("You have sucessfully logged in!");
//         }
//         else {
//             alert("Log in failed, try again.");
//             location.reload;
//         }
//     });
// });

$(document).ready( function() {
    
    var firebaseConfig = {
    apiKey: "AIzaSyAn4mnjUdV95nmOJ_7C6HnORmMhUFw27xM",
    authDomain: "vinylbase-7fe10.firebaseapp.com",
    databaseURL: "https://vinylbase-7fe10.firebaseio.com",
    projectId: "vinylbase-7fe10",
    storageBucket: "vinylbase-7fe10.appspot.com",
    messagingSenderId: "928999002977",
    appId: "1:928999002977:web:477940107bc0169196eb20",
    measurementId: "G-NZBN9PVLQX"
};
// Initialize Firebase
if (firebase) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    //alert("Firebase loaded");
}


  });

$(document).ready(function() {
    $("#login").submit(function() {
        var email = $("#Logemail").val().trim();
        var password = $("#Logpword").val().trim();
        
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((user)=> {
            alert("signed In");
            //location.hash ="#homePage";
            // $(":mobile-pagecontainer").pagecontainer("change", "#homePage");
            $.mobile.changePage($("#homePage"));
            //$.mobile.pageContainer.pagecontainer("change", "#homePage");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        })
    })
})

$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});

function populateAlbumInfo(data) {
    var data = JSON.parse(data);
}
// $(document).ready(
//   function() {
//     $("#scanready").on("click", function() {
//         //alert("test");
//         scan.scanDoc(successCallback, errorCallback, {sourceType : 1, fileName : "myfilename", quality : 1.0, returnBase64 : false}); 
//     });
//   }  
// );
function scanDoc() {
    scan.scanDoc(successCallback, errorCallback, {sourceType : 1, fileName : "myfilename", quality : 1.0, returnBase64 : false}); 
}



function successCallback(imageData) {

    alert(imageData)
    var divImage = $("#image");
    var image = $("#img")
    var im = new image();
    im.src = imageData;
    image.src = imageData;
    divImage.append(im);
}

function errorCallback(message) {
    alert('Failed because: ' + message);
}

//this code will only run when the homePage is being loaded it still needs an if, so it doesnt regrab albums every time


// $(document).on("pagebeforeshow", "#homePage", function() {
//     alert('This page was just hidden: ');
//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//               // User is signed in, see docs for a list of available properties
//               // https://firebase.google.com/docs/reference/js/firebase.User
//               var uid = user.uid;
//               //alert("loaded user" + uid);
//               var platlistsRef = db.collection("Playlist");
//               var query = platlistsRef.where("UserID", "==", uid);
//               alert(query)
//               // ...
//             } else {
//               // User is signed out
//               // ...
//             }
            
//           });
// });
$(window).on("navigate", function (event, data) {
    direction = data.state.direction;
    //event.preventDefault();
    if (direction == "back") {
        
        backButton = true;
        
    }
    console.log(backButton, direction);
});      

var backButton = false;
$(document).on("pageshow","#albumPage", function(e, data) {
    // varaible to check if page was reached by back button
    
    
   
    console.log(backButton);
    // if not reached by back button clear data
    if (!backButton) {
        var id = $(".tester")
        if (id != undefined) {
            id.remove();
        }
        var songResults = $("#SongResults");
        songResults.empty();
    }
    //grab data being sent from previous page
    var uid = window.localStorage.getItem("uid");
    window.localStorage.removeItem("uid");
    var isPlaylist = window.localStorage.getItem("isPlaylist");
    
    if (isPlaylist == "true") {
        userPlaylists.forEach((playlist) => {
            if (playlist.id == uid) {
                loadSongs(playlist.data().Songs);
            }
        });
            
    }
    else { //album
        userAlbums.forEach((album)=> {
            
            if (album.id == uid) {
                loadSongs(album.data().Songs);
            }
        });
    }
    //var query = $(this).data("url");
    //console.log(test);
    // query = query.replace("id=","");
    //var query = $.urlParam('id');

    //creating elemt with the id for testing
    var p = document.createElement("p");
    p.className = "tester";
    p.innerHTML = uid;
    document.getElementById("test2").appendChild(p);
    //alert(test);
});

$(document).on("pagehide", "#albumPage", function() {
    var id = document.getElementById("tester");
    //id.remove();
    window.localStorage.removeItem("uid");
    backButton = false;
    //alert("removed item");
})