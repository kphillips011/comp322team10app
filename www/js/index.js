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
$(document).ready(function () {
    $("#Signup").submit(function () {
        var email = $("#email").val().trim();
        var password = $("#Pword").val().trim();
        var confrimPassword = $("#confirmpassword").val().trim();
        if (password === confrimPassword) {


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
            alert("Passwords don't match");
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

$(document).ready(function () {

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

$(document).ready(function () {
    $("#login").submit(function () {
        var email = $("#Logemail").val().trim();
        var password = $("#Logpword").val().trim();

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
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

$(document).ready(function () {
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
        $(this).toggleClass('open');
    });
});

function populateAlbumInfo(data) {
    var data = JSON.parse(data);
}
$(document).ready(
    function () {
        $("#scanready").on("click", function () {
            console.log('taking picture');
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 75,
                targetWidth: 600,
                targetHeight: 600,
                allowEdit: false,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPG,
                destinationType: Camera.DestinationType.DATA_URL,
                correctOrientation: true
            });
        });
    }
);

//Callback function when the picture has been successfully taken
function onPhotoDataSuccess(imageData) {
    alert(imageData);
    //var scannedImage = document.getElementById('scannedImage');
    // Unhide image elements
    //scannedImage.style.display = 'block';
    //scannedImage.src = imageData;
   //alert('scanned image info: ' + scannedImage);

    scannedImage64 = document.getElementById('scannedImage64');
    scannedImage64.src = "data:image/jpg;base64, " + imageData;
    alert('scanned image data, 64 bit: ' + scannedImage64.src);
    
    //encodedImage = encode(imageData);
    //alert('image succcessfully encoded');
    var uploadedImage = uploadToDB(scannedImage64.src);
    alert('uploaded to database ' + uploadedImage);

    downloadedImage = downloadFromDB(uploadedImage);

    alert('downloaded image: ' + downloadedImage);

    googleVision(scannedImage64.src);

    // Get image handle

    //movePic(imageData);
}

function uploadToDB(scanned) {
    alert('entering uploading to database function');
    //var scanned = document.getElementById('scannedImage');
    //scanned.src = "data:image/jpg;base64," + scanned;

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var scannedImages = storageRef.child('scannedImages');
    var scannedRef = scannedImages.child(scanned);

    var scannedPic = document.createElement("scannedPic");

    var metadata = {
        contentType: 'image/jpg'
    }

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = scannedImages.child('picture').put(scanned, metadata);
    alert('put image ' + scanned);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            alert('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    alert('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    alert('Upload is running');
                    break;
            }
        }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    alert('storage/unauthorized');
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    alert('storage/canceled');
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    alert('storage/unknown');
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        })
    alert('end of uploading function');
    return scanned;
}

function downloadFromDB(image) {
    alert('entered download function');
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var scannedRef = storageRef.child('scannedImages');
    var picRef = scannedRef.child('picture');
    alert('image reference for download: ' + imageRef);
    picRef.getDownloadURL().then(function (url) {
        alert('download url: ' + url);
        image.src = url;
        alert('downlaod image src: ' + image.src);
        return image.src;

    }).catch(function (error) {
        alert(error);
    });

    alert('downlaoded from database officially ' + image.src);
}

/*
function encode(imagePath) {
    alert('entered encoding');
    //var selectedFile = imagePath.files();
    //var imageFile = selectedFile[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result;
        return srcData;
    }
    alert('endcoded');
    fileReader.readAsDataURL(imageFile);
    alert('fildreader read wooo');
}
*/

//Callback function when the picture has not been successfully taken
function onFail(message) {
    alert('Failed to load picture because: ' + message);
}

function movePic(imageData) {
    alert("move pic");
    alert(imageData);
    window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry) {
    alert("resolvetosuccess");

    //new file name
    var newFileName = entry + ".jpg";
    alert(newFileName);
    var myFolderApp = "ImgFolder";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
        alert("folder create");

        googleVision(newFileName);

        //The folder is created if doesn't exist
        fileSys.root.getDirectory(myFolderApp,
            { create: true, exclusive: false },
            function (directory) {
                alert("move to file..");
                entry.movePic(directory, newFileName, successMove(), resOnError);
                alert("release");

            },
            resOnError);
    },
        resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove() {
    alert("success");
    alert(entry);
    //googleVision(entry);
}

function resOnError(error) {
    alert("failed");
}

function googleVision(file) {
    alert('entered GV function with ' + file);
    const {ImageAnnotatorClient} = import('@google-cloud/vision');

    alert('GV initalized vision');

    // Instantiates a client
    const projectID = "comp-322-vinylbase-v2";
    alert('project id: ' + projectID);
    const keyFilename = 'cloud-vision.json';
    alert('keyFilename: ' + keyFilename);
    const client = new ImageAnnotatorClient({projectID, keyFilename});

    alert('GV created client');

    /*
    async function runRecog() {
        //const fileName = 'example5.jpg';
        const fileName = file;

        alert('GV saved file name');

        // Detect similar images on the web to a local file
        const [result] = await client.webDetection(fileName);
        const webDetection = result.webDetection;

        alert('GV detected web entities');

        if (webDetection.webEntities.length) {
            alert(`Web entities found: ${webDetection.webEntities.length}`);
            webDetection.webEntities.forEach(webEntity => {
                alert(`Description: ${webEntity.description}`);
            });
        }

        if (webDetection.bestGuessLabels.length) {
            alert(
                `Best guess labels found: ${webDetection.bestGuessLabels.length}`
            );
            webDetection.bestGuessLabels.forEach(label => {
                alert(`  Label: ${label.label}`);
            });
        }
    } */
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
    //console.log(backButton, direction);
});

var backButton = false;
$(document).on("pageshow", "#albumPage", function (e, data) {
    // varaible to check if page was reached by back button


    var name = window.localStorage.getItem("name");

    //console.log(backButton);
    // if not reached by back button clear data
    if (!backButton) {
        var id = $(".tester")
        if (id != undefined) {
            id.remove();
        }
        var songResults = $("#SongResults");
        songResults.empty();
        $("#albumTitle").text(name);
        if ($('#albumImageContainer').has("img")) {
            $('#albumImageContainer').empty();
        }
    }
    //grab data being sent from previous page
    var uid = window.localStorage.getItem("uid");
    //window.localStorage.removeItem("uid");
    var isPlaylist = window.localStorage.getItem("isPlaylist");
    var isResult = window.localStorage.getItem("isresult");

    if (isPlaylist == "true") {
        $("#addtoPlaylist").show();
        $("#songDeleteDiv").show();
        if (isResult == "true") {
            playlists.forEach((playlist) => {
                if (playlist.id == uid) {
                    loadSongs(playlist.data().Songs);
                    if ("Image" in playlist.data()) {

                        loadImage(playlist.data().Image);
                    }
                }
            });
        } else {
            userPlaylists.forEach((playlist) => {
                if (playlist.id == uid) {
                    loadSongs(playlist.data().Songs);
                    if ("Image" in playlist.data()) {

                        loadImage(playlist.data().Image);
                    }
                    // if("Image" in playlist.data()) {
                    //     console.log();
                    //     loadImage(playlist.data().Image);
                    // }
                }
            });
        }

    }
    else { //album
        $("#addtoPlaylist").hide();
        $("#songDeleteDiv").hide();
        if (isResult == "true") {
            albums.forEach((album) => {
                if (album.id == uid) {
                    loadSongs(album.data().Songs);
                    if ("Image" in album.data()) {

                        loadImage(album.data().Image);
                    }
                }
            })
        } else {
            userAlbums.forEach((album) => {

                if (album.id == uid) {
                    loadSongs(album.data().Songs);
                    if ("Image" in album.data()) {

                        loadImage(album.data().Image);

                    }
                }
            });
        }
    }
    //var query = $(this).data("url");
    //console.log(test);
    // query = query.replace("id=","");
    //var query = $.urlParam('id');

    //creating elemt with the id for testing
    // var p = document.createElement("p");
    // p.className = "tester";
    // p.innerHTML = uid;
    // document.getElementById("albumId")
    $("#albumId").text(uid);
    //alert(test);
});

$(document).on("pagehide", "#albumPage", function () {
    var id = document.getElementById("tester");
    //id.remove();
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("isPlaylist");
    backButton = false;
    //alert("removed item");
})