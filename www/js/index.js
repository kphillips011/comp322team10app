document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');


}

$(document).ready(function () {
    $("#testSignUp").on("click", function () {
        if ($("#pword").val().trim() === $("#confirmpassword").val().trim()) {
            window.localStorage.setItem("key1", $("#uname").val().trim())
            window.localStorage.setItem("key2", $("#pword").val().trim())
            window.localStorage.setItem("key3", $("#email").val().trim())
            alert("Sign Up sucessful.")
        }
    });
});

$(document).ready(function () {
    $("#testCred").on("click", function () {
        if ($("#Loguname").val().trim() === "testUser" && $("#Logpword").val().trim() === "testPassword") {
            alert("You have sucessfully logged in!");
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

            scan.scanDoc(successCallback, errorCallback, { sourceType: 1, fileName: "myfilename", quality: 1.0, returnBase64: false });
        });
    }
);

//Callback function when the picture has been successfully taken
function onPhotoDataSuccess(imageData) {
    alert(imageData);
    googleVision(imageData);
    // Get image handle
    var scannedImage = document.getElementById('scannedImage');

    // Unhide image elements
    scannedImage.style.display = 'block';
    scannedImage.src = imageData;
    //movePic(imageData);
}

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
                entry.movePic(directory, newFileName, successMove(newFileName), resOnError);
                alert("release");

            },
            resOnError);
    },
        resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    alert("success");
    alert(entry);
    //googleVision(entry);
}

function resOnError(error) {
    alert("failed");
}

async function googleVision(file) {
    alert("entered GV function");
    const vision = require('@google-cloud/vision');

    alert('GV initalized vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    alert('GV created client');

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
