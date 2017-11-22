document.addEventListener("deviceready", function () {
    // init();
}, false);

function getMood() {
    navigator.camera.getPicture(function (base64) {
        // on succes
        // set img
        // console.info(base64);
        // setImage(base64);
        sendToServer().done(function (data) {
            // determan mood
            var lowestMood = getlowestMood(data[0].scores);
            console.log(lowestMood);
            document.querySelector("#MOOD_VAR").append(lowestMood);
            nextScreen();
        });
    }, function (e) {
        // foto failed
        alert("taking the picture failed: " + e);
    }, {destinationType: Camera.DestinationType.FILE_URI});
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

function sendToServer(callback) {
    api = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";
    key = "df55abe92f124dd48192b25cc140f18e";
    callback($.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,emotion",
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/json");

            // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", key);
        },
        type: "POST",
        // Request body
        data: '{"url": "https://img.buzzfeed.com/buzzfeed-static/static/2014-04/tmp/webdr02/2/17/0e7cd6da3ce720d983515a9ab831a530-3.jpg?downsize=715:*&output-format=auto&output-quality=auto"}',
        success: function (data) {
            console.info(data);
            return data;
        },
        error: function () {
            console.error('Error occured when sending data');
        }
    }));
}

function getEmotion() {
    var response = sendToServer( function (response) {
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