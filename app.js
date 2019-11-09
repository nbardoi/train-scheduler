var firebaseConfig = {
  apiKey: "AIzaSyARc2BoDAwXfBOGquZA2fajsAOeOLp8CTg",
  authDomain: "new-member-a5313.firebaseapp.com",
  databaseURL: "https://new-member-a5313.firebaseio.com",
  projectId: "new-member-a5313",
  storageBucket: "new-member-a5313.appspot.com",
  messagingSenderId: "400495999207",
  appId: "1:400495999207:web:9c3d4f3ededaf979694a42",
  measurementId: "G-N3WLS16D9C"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#currentTime").append(moment().format("hh:mm A"));

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#train-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFreq,
      };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert(newTrain.name + " has been successfully added");

    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

    return false;
  });

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var sv = childSnapshot.val();
  
    var trainName = sv.name;
    var trainDestination = sv.destination;
    var trainTime = sv.time;
    var trainFreq = sv.frequency;
    
    var trainTimePretty = moment().diff(moment.unix(trainTime), "minutes") % trainFreq;
    var  trainMinutes = trainFreq - trainTimePretty;

    var trainNextArrival = moment().add(trainMinutes, "m").format("hh:mm A");
  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFreq),
      $("<td>").text(trainNextArrival),
      $("<td>").text(trainMinutes)
    );
  
    $("#train-table > tbody").append(newRow);
    });