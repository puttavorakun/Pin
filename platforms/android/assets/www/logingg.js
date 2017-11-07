var mainText = document.getElementById("mainText");
var submitBtn = document.getElementById("submitBtn");




//------------------------


var fireHeading=document.getElementById("fireHeading");
var fireHeading2=document.getElementById("fireHeading2");
var fireHeading3=document.getElementById("fireHeading3");
var fireHeading4=document.getElementById("fireHeading4");

var firebaseHeadingRef = firebase.database().ref().child("post1");
var firebaseHeadingRef2 = firebase.database().ref().child("post2");
var firebaseHeadingRef3 = firebase.database().ref().child("post3");
var firebaseHeadingRef4 = firebase.database().ref().child("post4");


//MESSAGE POST

firebaseHeadingRef2.on('value',function(datasnapshot2){
	fireHeading2.innerText = datasnapshot2.val();
});
firebaseHeadingRef3.on('value',function(datasnapshot3){
	fireHeading3.innerText = datasnapshot3.val();
});
firebaseHeadingRef4.on('value',function(datasnapshot4){
	fireHeading4.innerText = datasnapshot4.val();
});





firebaseHeadingRef.on('value',function(datasnapshot){
	fireHeading.innerText = datasnapshot.val();
});



function submitClick(){	
	var firebaseRef = firebase.database().ref();
	var messageText = mainText.value;

	firebaseRef.child("post1").set(messageText);	
}


//USER POST

