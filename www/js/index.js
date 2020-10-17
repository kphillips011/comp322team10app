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

$(document).ready(
    function() {
    console.log(scan);
    $("#scanready").on("click", function() {
        scan.scanDoc(successCallback, errorCallback, {sourceType : 1, fileName : "myfilename", quality : 1.0, returnBase64 : false}); 
    });
});
function successCallback(imageData) {
    alert(imageData);
    console.log(imageData);
    var image = document.getElementById('myImage');
    image.src = imageData; // Image URL rendering. 
    //image.src = imageData + '?' + Date.now(); // For iOS, use this to solve issue 10 if unique fileName is not set.
    //image.src = "data:image/jpeg;base64," + imageData; // Base64 rendering
}
function errorCallback(message) {
    alert('Failed because: ' + message);
}
