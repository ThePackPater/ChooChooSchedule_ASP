

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
  var arrival = moment($("#firstChoo").val().trim(), "HH:mm").format("X");
  var freq = $("#chooInterval").val().trim();

  /* ---checking input value ---
  console.log(trainName);
  console.log(destination);
  console.log(arrival);
  console.log(freq);*/

  // ----- var temp object{} for train data
  var newTrain = {
    name: trainName,
    place: destination,
    start: arrival,
    rate: freq
  };

  // ----- upload to firebase
  chooDb.ref().push(newTrain);

  /* Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.start);
  console.log(newTrain.rate);*/


  // ---- Clear input fields
  $("#chooName").val("");
  $("#chooPlace").val("");
  $("#firstChoo").val("");
  $("#chooInterval").val("");

});

// --- Create Firebase event for adding new train to the database 
chooDb.ref().on("child_added", function (childSnapshot) {

  //console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tPlace = childSnapshot.val().place;
  var tStart = childSnapshot.val().start;
  var tRate = childSnapshot.val().rate;


  var cleanStart = moment.unix(tStart).format("HH:mm");


   /* --- Train Info
  console.log(tName);
  console.log(tPlace);
  console.log(tStart);
  console.log(tRate);*/


  //calculate time away and update!
  // var tAway = moment(tStart/tRate).fromNow();

  // make de new row & info!
  var train = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tPlace),
    $("<td>").text(cleanStart),
    $("<td>").text(tRate + " minutes")
    //$("<td>").text(tAway),

  );

  // insert the new row to the table
  $("#newTrains").prepend(train);

});

