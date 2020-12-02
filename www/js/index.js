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
        
        scan.scanDoc(successCallback, errorCallback, {sourceType : 1, fileName : "myfilename", quality : 1.0, returnBase64 : false}); 
    });
  }  
);


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

async function googleVision() {
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = 'example5.jpg';

    // Detect similar images on the web to a local file
    const [result] = await client.webDetection(fileName);
    const webDetection = result.webDetection;

    if (webDetection.webEntities.length) {
        console.log(`Web entities found: ${webDetection.webEntities.length}`);
        webDetection.webEntities.forEach(webEntity => {
        console.log(`Description: ${webEntity.description}`); 
        });
    }

    if (webDetection.bestGuessLabels.length) {
        console.log(
        `Best guess labels found: ${webDetection.bestGuessLabels.length}`
    );
        webDetection.bestGuessLabels.forEach(label => {
        console.log(`  Label: ${label.label}`);
        });
    }
}
googleVision();


