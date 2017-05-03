var express = require('express');
var mysql=require('mysql');
var fs=require("fs");
var formidable=require("formidable");
var router =express.Router();

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'lyt108',
	database: 'xuesheng', //数据库名称
	port: '3306'
})
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
router.post('/tou', function(req, res) {

	//创建一个connection
	var form = new formidable.IncomingForm();
	form.uploadDir = "public/upload/temp/"; //改变临时目录
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
			var uploadDir = "./public/upload/temp/" + fName;
			fs.rename(file.path,uploadDir) 
			res.send({fName:fName})
		}
		
	});

});
router.get('/xinxi', function(req, res) {
	if(req.session.uname != '' && req.session.password != '') {
	var xiang = req.query.Uid;
	console.log(xiang)
	xinxi(xiang, function(err, results) {
		if(err) {
			res.send(err)
		} else if(results) {
			//console.log(">>>"+results);
			console.log(results)
			res.send(results);
		}
	});
	}else{
		res.send({flag:1})
	}
})

//根据id查询用户
function xinxi(xiang, callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'select * from list where Uid = ?';
		conn.query(sql, [xiang], function(err, result) {
			console.log('result:' + result)
			if(err) {
				console.log("getAllUsers Error:" + err.message);
				return;
			}
			conn.release(); //释放连接
			callback(err, result);

		})
	})
}

module.exports=router;