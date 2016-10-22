var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

/* GET home page. */
router.post('/speech', function(req, res, next) {

	waveData = [0,0,0,0,0,0,1];
	//console.log(req.query.speechKey);
	request.post({
		url : 'https://speech.platform.bing.com/recognize/query',
		qs: {
			'scenarios': 'ulm',
	        'appid': 'D4D52672-91D7-4C74-8AD8-42B1D98141A5', // This magic value is required
	        'locale': 'en-US',
	        'device.os': 'wp7',
	        'version': '3.0',
	        'format': 'json',
	        'requestid': '1d4b6030-9099-11e0-91e4-0800200c9a66', // can be anything
	        'instanceid': '1d4b6030-9099-11e0-91e4-0800200c9a66' // can be anything
		},
		body: waveData, 
		headers: {
			'Authorization': 'Bearer ' + req.query.speechKey,
			'Content-Type': 'audio/wav; samplerate=1600', 
			'Content-Length': waveData.length
		}
	}, function(err, resp, body){
		if(err) return callback(err);
		try{
			callback(null, JSON.parse(body));
		}
		catch(e){
			callback(e);
		}
	});
});
	/*
	post_save_data = [0,0,0,0,0,0]
	var post_option={
		hostname:'https://speech.platform.bing.com',
		port:443,
		path:'/recognize/query', 
		method:'POST',
		headers:{
			'Content-type': 'audio/wav; samplerate=8000',
			'Content-Length': post_save_data.length,
			'Authorization':'Bearer ' + req.query.speechKey
		}
	}

	var post_req = https.request(post_option, function(response){
		var responseText;
		response.on('data', function(rdata){
			responseText += rdata;
		});
	});

	post_req.write(post_save_data);
	post_req.end();

});*/

module.exports = router;
