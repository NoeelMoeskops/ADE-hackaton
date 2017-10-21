document.addEventListener("deviceready", function () {
    init();
}, false);

function getMood() {
    navigator.camera.getPicture(function (base64) {
        // on succes

        sendToServer().done(function (data) {
            // determan mood
            return getlowestMood(data[0].scores);

        });
    }, function (e) {
        // foto failed
        alert("taking the picture failed: " + e);
    }, {destinationType: Camera.DestinationType.DATA_URL});
}
function getlowestMood(mood) {
    console.info("getlowestMood");
    return "happiness";
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
function sendToServer() {
//        var ajax =
    return $.ajax({
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");

            // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","4816fe0635a940cfa7b352d347bc9c7c");
        },
        type: "POST",
        // Request body
        data: '{"url": "http://keenthemes.com/preview/metronic/theme/assets/pages/media/profile/profile_user.jpg"}',
        success: function(data) {
//                console.info(data);
            return data;
        },
        error: function() {
            console.error('Error occured');
        }
    });
}
function init() {
    sendToServer().done(function (data) {
        getlowestMood(data[0].scores);
    });
}