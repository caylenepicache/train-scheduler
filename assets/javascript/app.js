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


    //CONVERSIONS-----------------------------------
    //takes current time
    var currentTime = moment();
    console.log("current time:" + moment().format());
    //converts first train time given
    var convertFirstTrainTime = moment(snapshot.val().firstTrain, 'HH:mm');
    console.log(convertFirstTrainTime);
    
    //converts in minutes the difference in times of first train to now
    var minDiffFirstTrain = currentTime.diff(convertFirstTrainTime, 'minutes');
    console.log(minDiffFirstTrain);

    //takes the remainder of minutes left by using the frequency of the train
    var minLastArrival = minDiffFirstTrain % snapshot.val().frequency;
    console.log(minLastArrival);

    //how many minutes from frequency to the last arrival
    var minAway = snapshot.val().frequency - minLastArrival;
    console.log("minutes away" + minAway);

    //adds minutes of the remainder to next train time
    var nextTrain = currentTime.add(minAway, 'minutes');
    console.log(nextTrain);

    //converts the train time in the correct format
    var convertNextTrainTime = nextTrain.format("HH:mm");


//APPEND TO DIV----------------------
    $("#insertData").append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + convertNextTrainTime +  "</td><td>" + minAway  + "</td></tr>") 

}, function(errorObject) {
    console.log("Error: " + errorObject.code);
});

