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

$(document).ready(function(){
    $("#testSignUp").on("click", function(){
        if ($("#pword").val().trim() === $("#confirmpassword").val().trim()) {
            window.localStorage.setItem("key1", $("#uname").val().trim())
            window.localStorage.setItem("key2", $("#pword").val().trim())
            window.localStorage.setItem("key3", $("#email").val().trim())
            alert("Sign Up sucessful.")
        }
    });
});

$(document).ready(function(){
    $("#testCred").on("click", function(){
        if ($("#Loguname").val().trim() === "testUser" && $("#Logpword").val().trim() === "testPassword") {
            alert("You have sucessfully logged in!");
        }
        else {
            alert("Log in failed, try again.");
            location.reload;
        }
    });
});



$(document).ready(function(){
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});

function populateAlbumInfo(data) {
    var data = JSON.parse(data);
}
$(document).ready(
  function() {
    $("#scanready").on("click", function() {
        //scan.scanDoc(successCallback, errorCallback, {sourceType : 1, fileName : 'image', quality : 1.0, returnBase64 : false});
        // navigator.camera.getPicture(onSuccess, onFail, { quality: 20,
        //     destinationType: Camera.DestinationType.FILE_URL
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    });
  }  
);

// REFERENCE
// https://stackoverflow.com/questions/10335563/capturing-and-storing-a-picture-taken-with-the-camera-into-a-local-database-ph

// function onSuccess(imageData) {
//     alert('Image successfully scanned');
//     var image = document.getElementById('img');
//     image.src = imageData + '?' + Math.random();;
// }

// function successCallback(imageData) {

//     alert(imageData)
//     //console.log(imageData);
//     //var scannedImage = document.getElementById('scannedImage');
//     //scannedImage.src = imageData;
//     //var image = $("#image")
//     //image.src = imageData;
//     //window.localStorage.setItem("scannedImage", image);
//     //var image = document.getElementById('image')
//     //var divImage = $("#image");
//     //var image = $("#img")
//     //var im = new image();
//     //im.src = imageData;
// }

// function errorCallback(message) {
//     alert('Failed because: ' + message);
// }

//Callback function when the picture has been successfully taken
function onPhotoDataSuccess(imageData) {                
    alert(imageData);
    // Get image handle
    var scannedImage = document.getElementById('scannedImage');

    // Unhide image elements
    scannedImage.style.display = 'block';
    scannedImage.src = imageData;
}

//Callback function when the picture has not been successfully taken
function onFail(message) {
    alert('Failed to load picture because: ' + message);
}

function movePic(imageData){ 
    console.log("move pic");
    console.log(imageData);
    window.resolveLocalFileSystemURL(imageData, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
    console.log("resolvetosuccess");

        //new file name
        var newFileName = itemID + ".jpg";
        var myFolderApp = "ImgFolder";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
            console.log("folder create");

            //The folder is created if doesn't exist
            fileSys.root.getDirectory( myFolderApp,
                {create:true, exclusive: false},
                function(directory) {
                    console.log("move to file..");
                    entry.moveTo(directory, newFileName,  successMove, resOnError);
                    console.log("release");

                },
                resOnError);
        },
        resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    console.log("success");
    console.log(entry);
}

function resOnError(error) {
    console.log("failed");
}


