document.addEventListener("deviceready", function () {
    // init();
}, false);

function getMood() {
    navigator.camera.getPicture(function (base64) {
        // on succes
        // set img
        console.info(base64);
        setImage(base64);
        // sendToServer().done(function (data) {
        //     // determan mood
        //     // var lowestMood = getlowestMood(data[0].scores);
        //     // console.log(lowestMood);
        //     // document.querySelector("#MOOD_VAR").append(lowestMood);
        // console.info("toBinary");
        // var binary = base64ToArrayBuffer(base64);
        // var byteArray = base64_to_uint8array(base64);
        // console.info("getEmotion");
        // getEmotion(byteArray);
        setTimeout(function () {
            nextScreen();
        }, 2000);
        // });
    }, function (e) {
        // foto failed
        alert("taking the picture failed: " + e);
    }, {destinationType: Camera.DestinationType.FILE_URI});
}


function base64_to_uint8array(s) {
    var byteChars = atob(s);
    var l = byteChars.length;
    var byteNumbers = new Array(l);
    for (var i = 0; i < l; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
}

function getlowestMood(mood) {
    // console.info("getlowestMood");
    return "happy";
//        var lowest = 0;
//        console.info("s" + mood.length);
//        for(var i = 0; i < mood.length; i++) {
//            console.info(mood[i])
//            if(mood[i] > mood[i + 1]) {
//                console.info("mood is lower then other");
//                lowest = i;
//            }
//        }
//        mood.anger
//        console.info(lowest);
}

function sendToServer(source, callback) {
    api = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";
    key = "df55abe92f124dd48192b25cc140f18e";
    callback($.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,emotion",
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");

            // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
        },
        type: "POST",
        // Request body
        data: source,
        success: function (data) {
            console.info(data);
            return data;
        },
        error: function () {
            console.error('Error occured when sending data');
        }
    }));
}

function getEmotion(source) {
    var response = sendToServer(source, function (response) {
        console.log("yes");
        var data = response.responseJSON[0].faceAttributes;
        console.info(data);
        var emotion = null;
        for (var key in data.emotion) {
            console.info(key);
        }
    });


}

function getVision() {
    var api = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0";
    var key = "2dd18f7e1a9d417faf0c6c1261118e64";
    sendToServer(api, key);
}

function setImage(img) {
    document.querySelector(".profile-pic").src = img;
}

function init() {
    // var lowestMood;
    // sendToServer().done(function (data) {
    //     lowestMood = getlowestMood(data[0].scores);
    // });
    getMood();
    setImage();
}