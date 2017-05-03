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
			console.log(fName)
			res.send({fName:fName})
		}
		
	});

});
router.get('/xiugai', function(req, res) {
	if(req.session.uname != '' && req.session.password != '') {
	var id = req.query.Uid;
	//console.log(id)
	findUser(id, function(err, results) {
		if(err) {
			res.send(err)
		} else if(results) {
			//console.log(">>>"+results);
			res.send(results);
		}
	});
	}else{
		res.send({flag:1})
	}
})

//根据id查询用户
function findUser(id, callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'select * from list where Uid = ?';
		conn.query(sql, [id], function(err, result) {
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

router.post('/xiugaii', function(req, res) {
		var Uid=req.body.Uid;
		var name = req.body.Name;
		var teachername = req.body.teachername;
		var classnames = req.body.classnames;
		var cellphone = req.body.cellphone;
		var address = req.body.address;
		var patriarchname = req.body.patriarchname;
		var patriarccellphone= req.body.patriarccellphone;
		var dorm = req.body.dorm;
		var studentUid = req.body.studentUid;
		var number = req.body.number;
		var teacherlaoshi = req.body.teacherlaoshi;
		var sex=req.body.sex;
		var weiji=req.body.weiji;
		var zhoukao=req.body.zhoukao;
		var yuekao=req.body.yuekao;
		var weijifen=req.body.weijifen;
		var img=req.body.img;
		console.log(Uid)
		save(name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,number,teacherlaoshi,sex,weiji,zhoukao,yuekao,weijifen,img,Uid,function(err, result) {
			
			if(err){
				err={flag:3};
			res.send(err)
			return;
			}
			
				if(result) {
					result={flag:1};
					res.send(result) //修改成功
						console.log('aaa')
				}else{
					err={flag:2}
				}

			}) //注册成功
	})
	//保存数据
function save(name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,number,teacherlaoshi,sex,weiji,zhoukao,yuekao,weijifen,img,Uid,callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'update list set name=?,teachername=?,classnames=?,cellphone=?,address=?,patriarchname=?,patriarccellphone=?,dorm=?,studentUid=?,number=?,teacherlaoshi=?,sex=?,weiji=?,zhoukao=?,yuekao=?,weijifen=?,img=? where Uid = ?';
		conn.query(sql, [name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,number,teacherlaoshi,sex,weiji,zhoukao,yuekao,weijifen,img,Uid], function(err, result) {
			if(err) {
				console.log('insertUser:' + err.message);
				return;
			}
			conn.release(); //释放连接
			
			callback(err, result);
		})
	})
}
module.exports=router;