var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/analyze/:data', function(req, res, next) {
	//res.sendFile(__dirname, '/pages/analyze.html')
	console.log('hitting redirect');
	var redirecturl = '/analyze.html?data='+req.params.data;
	res.header('Content-Length', redirecturl.length);
	res.end(redirecturl);
});

module.exports = router;
