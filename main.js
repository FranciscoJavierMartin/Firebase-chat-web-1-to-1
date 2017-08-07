 ;(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgPC2Mq_HPQFMZ5WZZd80nF0GnEIDDv0A",
    authDomain: "webchat1to1.firebaseapp.com",
    databaseURL: "https://webchat1to1.firebaseio.com",
    projectId: "webchat1to1",
    storageBucket: "",
    messagingSenderId: "301989175636"
  };
  firebase.initializeApp(config);

  var loginBtn=document.getElementById('start-login')
  var user
  loginBtn.addEventListener("click",googleLogin)

  function googleLogin(){
  	var provider = new firebase.auth.GoogleAuthProvider();

  	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  	user = result.user;
  	console.log(user)
  	$("#login").fadeOut()
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
  }
 })()

