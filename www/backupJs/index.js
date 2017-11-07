ons.ready(function() {
    // deviceready event is fired
    // Call whatever Cordova APIs

    $("#hello").click(function(){        
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.FILE_URI });
        
        function onSuccess(imageURI) {
            var image = document.getElementById('preview');
            image.src = imageURI;
        }
        
        function onFail(message) {
            alert('Failed because: ' + message);
        }
    });    
    $("#location").click(function(){        
        var onSuccess = function(position) {
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');
        };
    
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
    
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });   

    $("#scan").click(function(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera : true, // iOS and Android 
                showFlipCameraButton : true, // iOS and Android 
                showTorchButton : true, // iOS and Android 
                torchOn: true, // Android, launch with the torch switched on (if available) 
                saveHistory: true, // Android, save scan history (default false) 
                prompt : "Place a barcode inside the scan area", // Android 
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
                orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                disableAnimations : true, // iOS 
                disableSuccessBeep: false // iOS 
            }
         );
    });
});

function initTimeline(event) {
    
        var url = "http://psupin.azurewebsites.net/pins";
        $.get(url, function (data) {
            $("#timetab").attr("badge", data.length);
            $.each(data, function (index, item) {
                $.get('card.html', function (template) {
                    var rendered = Mustache.render(template, item);
                    $("#pins").append(rendered);
                });
            });
        });
    }