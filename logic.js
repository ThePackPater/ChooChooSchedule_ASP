

//------initialize firebase!
var config = {
  apiKey: "AIzaSyAMHq-cRWXmKK1A2lvxxLGeIVLOQmzHXMc",
  authDomain: "choochooschedule.firebaseapp.com",
  databaseURL: "https://choochooschedule.firebaseio.com",
  projectId: "choochooschedule",
  storageBucket: "choochooschedule.appspot.com",
  messagingSenderId: "122401938441"
};

firebase.initializeApp(config);

var chooDb = firebase.database();


// ------- onClick #addTrains
$("#addTrains").on("click", function (event) {

  event.preventDefault();


  // --- var(s) to grab data #chooName #chooPlace #firstChoo #chooInterval
  var trainName = $("#chooName").val().trim();
  var destination = $("#chooPlace").val().trim();
  var arrival = moment($("#firstChoo").val().trim(), "HH:mm");
  var freq = $("#chooInterval").val().trim();


  // ----- var temp object{} for train data
  var newTrain = {
    name: trainName,
    place: destination,
    start: arrival,
    rate: freq
  };

  // ----- upload to firebase
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.start);
  console.log(newTrain.rate);


  // ---- Clear input fields
  $("#chooName").val("");
  $("#chooPlace").val("");
  $("#firstChoo").val("");
  $("#chooInterval").val("");

});

// --- Create Firebase event for adding new train to the database 
chooDb.ref().on("child-added", function (childSnapshot) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tPlace = childSnapshot.val().place;
  var tStart = childSnapshot.val().start;
  var tRate = childSnapshot.val().rate;

  // Train Info
  console.log(tName);
  console.log(tPlace);
  console.log(tStart);
  console.log(tRate);

  //calculate time away and update!
  // var tAway = 

  // make de new row & info!
  var newTrain = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tPlace),
    $("<td>").text(tStart),
    $("<td>").text(tRate),
    $("<td>").text(tAway),

  );

  // Append the new row to the table
  $("#newTrains > tbody").append(newTrain);

});

