//Initialize Firebase to week7 firebase project
  var config = {
    apiKey: "AIzaSyBHBQaus1mW7ZDKm1Ujut5MAZY5I7dnBLg",
    authDomain: "week7-325cf.firebaseapp.com",
    databaseURL: "https://week7-325cf.firebaseio.com",
    projectId: "week7-325cf",
    storageBucket: "",
    messagingSenderId: "448706112559"
  };

  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

$("#addInfoButton").on("click", function() {
    event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        timelogged: firebase.database.ServerValue.TIMESTAMP
    })

});

database.ref().on("child_added", function(snapshot) {

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    /*     $("#insertData").append("<tr><td>" + childSnapshot.val().empName + "</td><td>" + childSnapshot.val().role + "</td><td>" + childSnapshot.val().startDate + "</td><td>" + monthsWorked + "</td><td>" + childSnapshot.val().monthlyRate  + "</td></tr>" */

}, function(errorObject) {
    console.log("Error: " + errorObject.code);
});

//onclick function that adds values from input to #trainSchedule