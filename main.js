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

  var database=firebase.database()
  var loginBtn=document.getElementById('start-login')
  var user;
  var conectadoKey="";
  var usuariosConectados=null
  var rooms;

  loginBtn.addEventListener("click",googleLogin)
  window.addEventListener("unload",unlogin)

  function googleLogin(){
  	var provider = new firebase.auth.GoogleAuthProvider();

  	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  	user = result.user;
  	console.log(user)
  	$("#login").fadeOut()

  	initApp()
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

  function initApp(){
  	usuariosConectados=database.ref("/connected")
  	rooms=database.ref("/rooms")

  	login(user.uid,user.displayName||user.email)

  	usuariosConectados.on("child_added",addUser)
  	usuariosConectados.on("child_removed",removeUser)
  }

  function login(uid,name){
  	var conectado=usuariosConectados.push({
  		uid: uid,
  		name: name
  	});

  	conectadoKey=conectado.key
  }

  function unlogin(){
  	database.ref("/connected/"+conectadoKey).remove()
  }

  function addUser(data){
  	//if(data.val().uid==user.uid) return;
  	var friend_id=data.val().uid
  	var $li = $("<li>").addClass("collection-item")
  		.html(data.val().name)
  		.attr("id",friend_id)
  		.appendTo("#users");

  	$li.on("click",function(){
  		var room=rooms.push({
  			creator:user.uid,
  			friend: friend_id
  		})

  		new Chat(room.key,user,"chats",database)
  	});
  }

  function removeUser(data){
  	$("#"+data.val().uid).slideUp('fast',function(){
  		$(this).remove();
  	})
  }

 })()

