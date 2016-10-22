var express = require('express');
var router = express.Router();
var config = require('config');

var apiUrl = "https://api.projectoxford.ai/emotion/v1.0/recognize";

var toBlob = function(data_uri, type) {
    var bytes = atob(data_uri.split(',')[1])
    var arr = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
    	arr[i] = bytes.charCodeAt(i);
    }
  return new Blob([arr], { type: type || 'image/png' });
};

/* GET home page. */
router.post('/emotions/:datauri', function(req, res, next) {
	console.log('what');
	$.ajax({
		url: apiUrl, 
		beforeSend: function (xhrObj){
			xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", config.get('emotion_key'));
		},
		type: "POST", 
		data: toBlob(req.params.datauri.replace(/\-/g, '\/'), "image/png"), 
		processData: false
	})
	.done(function(response){
		res.send(response);
	});
});

router.get('/emotions/:something', function(req, res, next){
	res.send(req.params.something)
});

module.exports = router;
