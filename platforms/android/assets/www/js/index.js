



ons.ready(function() {
   
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

      //images
 $("#pic").click(function (){
    $("#show").empty();
    $("#soon").empty();
       var com=
           '<p>'+
               '<input type="file" id="take-picture" accept="image/*">'+
               '<img src="about:blank" alt="" id="show-picture">'+
           '</p>'+
           '<input id="linkurl" type="text" class="text-input text-input--underbar" placeholder="URL"  value="">'+'</div>'+
           '<div>'+'<input id="title" type="text" class="text-input text-input--underbar" placeholder="Title"  value="">'+'</div>'+
           '<p id="error"></p>'+'<td align="center">'+
           '<br>'+
           '<textarea class="form-control" rows="5" id="comment">'+
           '</textarea>'+
           '</td>'+'<br>'+'<button id="input" class="button">'+'Submit'+'</button>';
        $("#soon").append(com);
        (function () {
          var takePicture = document.querySelector("#take-picture"),
              showPicture = document.querySelector("#show-picture");
          if (takePicture && showPicture) {
              // Set events
              takePicture.onchange = function (event) {
                  // Get a reference to the taken picture or chosen file
                  var files = event.target.files,
                      file;
                  if (files && files.length > 0) {
                      file = files[0];
                      try {
                          // Get window.URL object
                          var URL = window.URL || window.webkitURL;
                          // Create ObjectURL
                          var imgURL = URL.createObjectURL(file);
                          // Set img src to ObjectURL
                          showPicture.src = imgURL;
                          // Revoke ObjectURL after imagehas loaded
                          showPicture.onload = function() {
                              URL.revokeObjectURL(imgURL);  
                          };
                      }
                      catch (e) {
                          try {
                              // Fallback if createObjectURL is not supported
                              var fileReader = new FileReader();
                              fileReader.onload = function (event) {
                                  showPicture.src = event.target.result;
                              };
                              fileReader.readAsDataURL(file);
                          }
                          catch (e) {
                              // Display error message
                              var error = document.querySelector("#error");
                              if (error) {
                                  error.innerHTML = "Neither createObjectURL or FileReader are supported";
                              }
                          }
                      }
                  }
              };
          }
      })();  
   });

});
