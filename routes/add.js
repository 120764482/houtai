
var express = require('express');
var router =express.Router();
var mysql=require('mysql');
var fs=require("fs");
var formidable=require("formidable");
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
	form.uploadDir = "./public/upload/temp/"; //改变临时目录
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
			console.log(fName)
			res.send({fName:fName})
		}
		
	});

});
router.post('/add', function(req, res) {
	
		var name = req.body.Name;
		var teachername = req.body.teachername;
		var classnames = req.body.classnames;
		var cellphone = req.body.cellphone;
		var address = req.body.address;
		var patriarchname = req.body.patriarchname;
		var patriarccellphone= req.body.patriarccellphone;
		var dorm = req.body.dorm;
		var studentUid = req.body.studentUid;
		var num = req.body.num;
		var teacherlaoshi = req.body.teacherlaoshi;
		var sex=req.body.sex;
		var img=req.body.img;
		save(name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex,img,function(err, result) {
			
			if(err){
				err={flag:3};
			res.send(err)
			return;
			}
			
				if(result) {
					result={flag:1};


console.log('aaa')
					res.send(result) //添加成功
						
				}else{
					err={flag:2}
				}

			}) //注册成功
		
	})
	//保存数据
function save(name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex,img,callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'insert into list (name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,number,teacherlaoshi,sex,img) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';
		conn.query(sql, [name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex,img], function(err, result) {
			if(err) {
				console.log('insertUser:' + err.message);
				return;
			}
			conn.release(); //释放连接
			console.log("dasdasdasd")
			callback(err, result);
		})
	})
}
//function weiji(studentUid,callback) {
//	pool.getConnection(function(err, conn) {
//		var sql = 'insert into weiji (studentUid) values (?)';
//		conn.query(sql, [studentUid], function(err, result) {
//			if(err) {
//				console.log('insertUser:' + err.message);
//				return;
//			}
//			conn.release(); //释放连接
//			console.log("dasdasdasd")
//			callback(err, result);
//		})
//	})
//}


module.exports=router;