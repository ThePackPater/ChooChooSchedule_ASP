

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

var database = firebase.database();


// ------- onClick #addTrains
$("#addTrains").on("click", function(event) {

  event.preventDefault();


// --- var(s) to grab data #chooName #chooPlace #firstChoo #chooInterval
  var trainName = $("#chooName").val().trim();
  var destination = $("#chooPlace").val().trim();
  var arrival = moment($("#firstChoo").val().trim(), "HH:HH").format("X");
  var freq = $("#chooInterval").val().trim();


// ----- var temp object{} for train data
var newTrain = {
    name: trainName,
    place: destination,
    start: arrival,
    rate: freq
  };

  console.log(newTrain);

// ----- upload to firebase
database.ref().push(newTrain);

// ---- Clear input fields
$("#chooName").val("");
$("#chooPlace").val("");
$("#firstChoo").val("");
$("#chooInterval").val("");

});

// --- Create Firebase event for adding new train to the database 
database.ref().on("#newTrains", function(childSnapshot) {
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
  // var tAway = moment().diff(moment(tStart, "X"), "minutes");  console.log(tAway);

  // Create the new row
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

