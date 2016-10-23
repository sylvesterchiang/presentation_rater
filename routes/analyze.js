var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/analyze', function(req, res, next) {
	res.sendFile(__dirname, '/pages/analyze.html')
});

module.exports = router;
