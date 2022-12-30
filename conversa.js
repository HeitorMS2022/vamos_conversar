const firebaseConfig = {
    apiKey: "AIzaSyC1U-3EHt5hj57JGQfLdxQJ9SDGepLZWwg",
    authDomain: "conversa-bc32d.firebaseapp.com",
    databaseURL: "https://conversa-bc32d-default-rtdb.firebaseio.com",
    projectId: "conversa-bc32d",
    storageBucket: "conversa-bc32d.appspot.com",
    messagingSenderId: "286455190842",
    appId: "1:286455190842:web:3707d0c5f224b84cb22c03"
  };

firebase.initializeApp(firebaseConfig);
var roomName = localStorage.getItem("nomedasala");
var username = localStorage.getItem("nome");

function send(){
    var mensagem = document.getElementById("message").value;
    firebase.database().ref(roomName).push({
        name: username,
        mensagem: mensagem,
        likes: 0
    })
    document.getElementById("mensagem").value = "";
}

function logout(){
    localStorage.removeItem("nome");
    localStorage.removeItem("nomedasala");
    window.location = "login.html";
}
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    childData = childSnapshot.val();
    if(childKey != "purpose") {
    firebaseMessageId = childKey;
    messageData = childData;
    console.log(firebaseMessageId);
    console.log(messageData);
    name = messageData['name'];
    message = messageData['message'];
    like = messageData['like'];
    name_with_tag = "<h4> "+ name +" <img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
    row = name_with_tag + message_with_tag +like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
 } });  }); }
getData();
function updateLike(message_id){
    console.log("clicked in the like button - " + message_id);
    button_id = message_id;
    likes = document.getElementByIde(button_id).value;
    updateLike = Number(likes) + 1;
    console.log(updated_likes);
    
    firebase.database().ref(roomName).child(message_id).update({
        like : updated_likes
    });
}