//add data to firebase data
firebase.initializeApp({
    apiKey: "AIzaSyAATH-Ysnbt0gdkMwQvsveN5z5hPuiSZD0",
    authDomain: "psupin-3bf18.firebaseapp.com",
    projectId: "psupin-3bf18",

  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
  function addPostData(){


var get_post_location = document.getElementById('post_location').value;
var get_post_user = document.getElementById('post_user').value;
var get_post_img = document.getElementById('post_img').value;
var get_post_subject = document.getElementById('post_subject').value;
if(get_post_user.length<1){
    alert("กรุณาป้อน User");
    return;
    }
    if(get_post_img.length<1){
    alert("กรุณาป้อน URL img");
    return;
    }
    if(get_post_subject.length<1){
        alert("กรุณาป้อน URL Discription");
        return;
        }

    db.collection("upload_post").add({
        post_location: get_post_location,
        post_user:get_post_user,
        post_img:get_post_img ,
        post_subject:get_post_subject
    
    })
    .then(function(docRef) {
        alert("post finish");
        $('#tablebody').empty();
        
                        db.collection("upload_post").get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
        
                                console.log(doc.id, " => ", doc.data());
                                var  post_location = doc.post_location;
                                var post_user = doc.post_user;
                                var post_img = doc.post_img;
                               var post_subject =doc.post_subject;
                              
                             
        
                                var row = '<tr style="width:100%;" ><td style="width:100%;"><ons-card class="post"> <ons-list-item class="post_title"> <div class="left">  <img class="list-item__thumbnail" src="https://scontent.fbkk10-1.fna.fbcdn.net/v/t1.0-9/23130979_1570840649676702_4550237469048271010_n.jpg?oh=91b2b6d2d9fbdfa8172c04d7f358bf67&oe=5A6A7A2D" >  </div>       <div class="center">  <div class="list-item__title"><b> '  +
                                // "<th scope='row'>" + doc.id + "</th>" +
                                doc.data().post_user  +'</b></div>'+
                                ' <div class="list-item__subtitle" style="font-size: 12px">1 minute AGO<br>'+ doc.data().post_location+'</div>'+
                                ' </div>    </ons-list-item>          <div style="text-align: center; position: relative;" ondblclick="like(1)"><br>'+
'  <img src='+
                             doc.data().post_img +' alt="" width="80%"> <img class="post-image" src="">     </div>  <ons-list-item class="post-button-bar" modifier="nodivider">' +
                             '<div class="center" style="padding-top: 0px">  <ons-button class="post-button" modifier="quiet" onclick="like(1)"><ons-icon id="button-post-like-1" icon="fa-thumbs-o-up"></ons-icon> 99 Like</ons-button>    '+
                             '     </div> </ons-list-item> <div class="post-caption"><b>'+
                             doc.data().post_subject + '</b> <br></div>  </ons-card>' +
                                "     </td></tr>"



   
              
                      
             
        





                                
        
                                $('#tablebody').append(row);
        
                            });
                        });
    })
    .catch(function(error) {
        // console.error("Error adding document: ", error);
        alert("add error");
    });
fn.load("home.html");
  }