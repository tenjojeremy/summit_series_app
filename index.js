//Socket.io
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));


//johnny-five
var five = require("johnny-five");
var board = new five.Board({
    port: "COM5"
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

board.on("ready", function(document) {
    console.log('Board Connected!');
    //Variables
    var buttonPin1 = new five.Button(2);
    var buttonPin2 = new five.Button(4);
    var ledPin1 = new five.Led(13);
    var ledPin2 = new five.Led(12);

    var buttonState1 = 0;
    var buttonState2 = 0;


    //setup
    //initialize the LED pin as an output:
    ledPin1.OUTPUT;
    ledPin2.OUTPUT;

    //initialize the pushbutton pin as an input:
    buttonPin1.INPUT;
    buttonPin2.INPUT;

    //loop
    var count1 = 1;
    var count2 = 1;

    //1. platform 1 led starts blinking
    ledPin1.blink();

    //2 platform 1 led stays on
    buttonPin1.on("release", function() {
        console.log('Button 1 on!');
        ledPin1.stop();
        count1++;
        // console.log(count1);
        if (count1 > 1) {
            ledPin1.on();
            var trigger;
            io.emit('box1', trigger);
        }
    });
    //3 platform 1 ENDS, platform 2 starts blinking
    io.on('done', function(trigger) {
      console.log("HERE!");
    })

    buttonPin2.on("release", function() {
        // console.log('Button 2 on!');
        count2++;
        // console.log(count2);
        if (count2 > 1) {
            ledPin2.on();
            var trigger;
            io.emit('box2', trigger);
        }
    });

    http.listen(3000, function() {
        console.log('listening on *:3000');
    });

});
// http.listen(3000, function() {
//     console.log('listening on *:3000');
// });
