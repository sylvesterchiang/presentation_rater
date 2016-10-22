'use strict';

navigator.getUserMedia = navigator.getUserMedia ||
						navigator.webkitGetUserMedia ||
						navigator.mozGetUserMedia;

var record = $('#start');
var stop = $('#stop');

if (navigator.getUserMedia) {
	console.log('getUserMedia supported');
} else {
	console.log('getUserMedia not supported');
}

var constraints = {audio : true};
var chunks = [];

var onSuccess = function(stream){

	var mediaRecorder = new MediaRecorder(stream);

	$("#nostart").on('click', function(){

		mediaRecorder.start()
		console.log('audio recording started');
		console.log(mediaRecorder.state);
	});

	$("#nostop").on('click', function(){

		//clearInterval(refreshIntervalId);

		mediaRecorder.stop();
		console.log('audio recording stopped');
		console.log(mediaRecorder.state);
	});

	mediaRecorder.onstop = function(e){
		console.log('audio data now available');

		var blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});
		chunks = [];

		callSpeechAPI(blob);

	}

	mediaRecorder.ondataavailable = function(e){
		chunks.push(e.data);
	}
}

var onError = function(err){
	console.log(err + ' occurred.');
}