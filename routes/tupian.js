var express = require('express');
var mysql = require('mysql');
var fs = require("fs");
var formidable = require("formidable");
var router = express.Router();

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'lyt108',
	database: 'xuesheng', //数据库名称
	port: '3306'
})
router.post('/tou', function(req, res) {

	//创建一个connection
	var form = new formidable.IncomingForm();
	form.uploadDir = "g:/xinxihou/public/upload/temp/"; //改变临时目录
	form.parse(req, function(error, fields, files) {
		for(var i in files) {
			var file = files[i];
			var fName = (new Date()).getTime();
			switch(file.type) {
				case "image/jpeg":
					fName = fName + ".jpg";
					break;
				case "image/png":
					fName = fName + ".png";
					break;
				
			}
			var uploadDir = "g:/xinxihou/public/upload/temp/" + fName;
			fs.rename(file.path,uploadDir) 
				res.send(fName)
		}
	});

});

module.exports = router;