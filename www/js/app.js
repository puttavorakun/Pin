

ons.ready(function() {
    // deviceready event is fired
    // Call whatever Cordova APIs

    $("#takephoto").click(function(){        
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

//Register ---
function handSignUp(){
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    if(email.length<4){
    alert("กรุณาป้อน Email ให้ถูกต้อง");
    return;
    }
    if(password.length<4){
    alert("กรุณาป้อน Password มากกว่า 4 ตัว");
    return;
    }
    
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){alert('Registration Successfully'); location="index.html" })
    .catch(function(error) {
    
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
     
  

        
        if(errorCode == 'auth/weak-password'){ //this condition not working
            alert("The password is too weak");
          }else {
            alert(errorMessage);
            
        }
        console.log(error);
      });
    
    }
    //End Register ---
    
    //login with facebook
    
  
    
    ////--------$(function () {

    firebase.initializeApp({
      apiKey: "AIzaSyDp12cwdOACLCrd9aLrs8-x8Z7y1LGByr4",
      authDomain: "worawut-57798.firebaseapp.com",
      projectId: "worawut-57798",

   
  });

  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  $('#save').click(function () {

      var username = $('#username').val();
      var fullname = $('#fullname').val();
      var mobileno = $('#mobileno').val();

      db.collection("users").add({
          username: username,
          fullname: fullname,
          mobileno: mobileno
      })
          .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);                

              $('#tablebody').empty();

              db.collection("users").get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {

                      console.log(doc.id, " => ", doc.data());
                      var username = doc.username;
                      var fullname = doc.fullname;
                      var mobileno = doc.mobileno;

                      var row = "<tr>" +
                      "<th scope='row'>" + doc.id + "</th>" +
                      "<td>" + doc.data().username + "</td>" +
                      "<td>" + doc.data().fullname + "</td>" +
                      "<td>" + doc.data().mobileno + "</td>" +
                      "</tr>"

                      $('#tablebody').append(row);

                  });
              });
          
          })
          .catch(function (error) {
              console.error("Error adding document: ", error);
          });

  });
  




  document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.id == "home-page") {
      var stories = page.querySelector('#stories');
      generateStoryBubbles(stories);
    }
  });
  //The show event listener does the same thing as the one above but on the search page when it's shown.
  document.addEventListener('show', function(event) {
    var page = event.target;
    if (page.id == "search-page") {
      var channels = page.querySelector('#channels');
      generateStoryBubbles(channels);
    }
  });
  /*
  * This function is used to toggle the grid/list display of the posts in the profile page as well as
  * change the color of the buttons to show which is the current view.
  */
  function display(id) {
    document.getElementById("list").style.color="#1f1f21";
    document.getElementById("grid").style.color="#1f1f21";
    document.getElementById(id).style.color="#5fb4f4";
    document.getElementById("list_view").style.display="none";
    document.getElementById("grid_view").style.display="none";
    document.getElementById(id+"_view").style.display="block";
  }
  //The generateStoryBubbles function is used to create the carousel items be used as stories by the upper two events.
  function generateStoryBubbles(element) {
    for(var i=0; i<9; i++) {
      element.appendChild(ons.createElement(
        '<ons-carousel-item>' +
          '<div class="story">' +
          '<div class="story-thumbnail-wraper unread"><img class="story-thumbnail" src="assets/img/profile-image-0' + (i+1) + '.png" onclick="readStory(this)"></div>' +
          '<p>david_graham</p>' +
          '</div>' +
        '</ons-carousel-item>'
      ));
    }
  }
  //The Like function is used to make the white heart appear in front of the picture as well as make the like button into a red heart and vice versa.
  var like = function(num) {
    if (document.getElementById("button-post-like-"+num).classList.contains("like")) {
      document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart","like");
      document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart-outline");
    } else {
      document.getElementById("button-post-like-"+num).classList.remove("ion-ios-heart-outline");
      document.getElementById("button-post-like-"+num).classList.add("ion-ios-heart","like");
      document.getElementById("post-like-"+num).style.opacity = 1;
      setTimeout(function(){
        document.getElementById("post-like-"+num).style.opacity = 0;
      }, 600);
    }
  }
  //The readStory function is used to change the red circle around a new story into grey after tapping on the new storry (thus reading it)
  var readStory = function(event) {
    event.parentNode.classList.remove("unread");
    event.parentNode.classList.add("read");
  }


  
  var provider = new firebase.auth.FacebookAuthProvider();
  function loginFacebook(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result);
      //Do something when login complete
    }).catch(function(error) {
      //Do something when error
      console.log(error);
    });
}


function loginWithEmail(){
  
  
  var email = document.getElementById('txtEmail').value;
  var password = document.getElementById('txtPassword').value;
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){alert('welcome '+email);

  fn.load('information.html');
}).catch(function(error) {
  // Handle Errors here.
  
  var errorCode = error.code;
  var errorMessage = error.message;
  
  if(errorCode == 'auth/weak-password'){
    alert('Account not found.');
  }else {
    alert(errorMessage);
  }
  // ...
  });
  firebase.auth().onAuthStateChanged(function(user) {
      // document.getElementById('quickstat-verify-email').disabled = true;
      if (user) {
        var txtloginDiv = document.getElementById('txtlogIn').textContent  = 'Information';
        var fnloginDiv = document.getElementById('fnlogIn').setAttribute( "onClick", "fn.load('information.html')" );
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
  
        // var displayName = document.getElementById("displayName").value;
        // var email = document.getElementById("email").value;
        // var emailVerified = document.getElementById("emailVerified").value;
        // var photoURL = document.getElementById("photoURL").value;
        // var isAnonymous = document.getElementById("isAnonymous").value;
        // var uid = document.getElementById("uid").value;
        // var providerData = document.getElementById("providerData").value;
  
        document.getElementById("getDisplayName").value = displayName;
        document.getElementById("getEmail").value = email;
        document.getElementById("getEmailVerified").value = emailVerified;
        document.getElementById("getPhotoURL").value = photoURL;
        document.getElementById("getIsAnonymous").value = isAnonymous;
        document.getElementById("getUid").value = uid;
        document.getElementById("getProviderData").value = providerData;
  
        document.getElementById('displayName').innerHTML = displayName;
        document.getElementById("email").innerHTML = email;
          document.getElementById('emailVerified').innerHTML = emailVerified;
          document.getElementById('photoURL').innerHTML = photoURL;
          document.getElementById('isAnonymous').innerHTML = isAnonymous;
          document.getElementById('uid').innerHTML = uid;
          document.getElementById('providerData').innerHTML = providerData;
      // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
      // document.getElementById('btnLogin').textContent = 'Sign out';
      // document.getElementById('quickstart-account-details').textContent = json.stringify(user,null, '');
  //         if(!emailVerified){
  // // document.getElementById('quickstart-verify-email').disabled = false;
  
  //         }
    
        // ...
  
      } else {
     
        // document.getElementById('displayName').innerHTML = "Unknow";
        //   document.getElementById('email').innerHTML ="Unknow";
        //   document.getElementById('emailVerified').innerHTML = "Unknow";
        //   document.getElementById('photoURL').innerHTML ="Unknow" ;
        //   document.getElementById('isAnonymous').innerHTML = "Unknow";
        //   document.getElementById('uid').innerHTML = "Unknow";
        //   document.getElementById('providerData').innerHTML = "Unknow";
        // User is signed out.
        // ...
      //   document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      //   document.getElementById('btnLogin').textContent = 'Sign in';
      //   document.getElementById('quickstart-account-details').textContent = 'null';
      }
      // document.getElementById('quickstart-sign-in').disabled = false;
  
    });
  }
  function acclogOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("Logout successful.");
      fn.load('home.html');
    }).catch(function(error) {
      // An error happened.
      // alert("An error happened.");
    });
    var txtloginDiv = document.getElementById('txtlogIn').textContent  = 'Login';
    var fnloginDiv = document.getElementById('fnlogIn').setAttribute( "onClick", "fn.load('login.html')" );
   
  }


  function updateAcc(){
    var inputDisplayName = document.getElementById('getDisplayName').value;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        user.updateProfile({
            displayName: inputDisplayName
        }).then(function() {
            // Update successful.
            alert("Update successful.");
        }, function(error) {
            // An error happened.
            alert("An error happened.");
        });
    
      } else {
        // No user is signed in.
        alert("No user is signed in.");
      }
    });
  }
  
  
function btnDelete(){
  
    var user = firebase.auth().currentUser;
    
    user.delete().then(function() {
      // User deleted.
      alert("User deleted.");
    }).catch(function(error) {
      // An error happened.
      alert("An error happened.");
    });
  }
  

  