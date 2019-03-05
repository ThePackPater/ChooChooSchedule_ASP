

/*------initialize firebase!



// ------- onClick #addTrains
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();


// --- var(s) to grab data #chooName #chooPlace #firstChoo #chooInterval
  var trainName = $("#chooName").val().trim();
  var destination = $("#chooPlace").val().trim();
  var arrival = moment($("#firstChoo").val().trim(), "MM/DD/YYYY").format("X");
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

// ---- Clear input fields
$("#chooName").val("");
$("#chooPlace").val("");
$("#firstChoo").val("");
$("#chooInterval").val("");
});


// --- Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
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

  // change start time format from military to digital
  var trainStartdTime = moment.unix(tStart).format("h hh");

  //calculate time away and update!
  // Calculate the time away from next arrival (tAway = currenTtime, tRate, - tStart)
  var tAway = moment().diff(moment(tStart, "X"), "minutes");
  console.log(tAway);

 
  // Create the new row
  var newTrain = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tPlace),
    $("<td>").text(tStartdTime),
    $("<td>").text(tRate),
    $("<td>").text(tAway),
    
  );

  // Append the new row to the table
  $("#newTrains > tbody").append(newTrain);
});

