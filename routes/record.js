var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/record', function(req, res, next) {
	res.sendFile(__dirname, '/pages/record.html')
});

module.exports = router;
