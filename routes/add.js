
var express = require('express');
var router =express.Router();
var mysql=require('mysql')
var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'lyt108',
	database: 'xuesheng', //数据库名称
	port: '3306'
})

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
		
		save(name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex,function(err, result) {
			
			if(err){
				err={flag:3};
			res.send(err)
			return;
			}
			
				if(result.changedRows>0) {
					result={flag:1};
					weiji(studentUid,function(err,result){
						
					})
					res.send(result) //添加成功
						console.log('aaa')
				}else{
					err={flag:2}
				}

			}) //注册成功
	})
	//保存数据
function save(name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex,callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'insert into zhuce (name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex) values (?,?,?,?,?,?,?,?,?,?,?,?,?)';
		conn.query(sql, [name,teachername,classnames,cellphone,address,patriarchname,patriarccellphone,dorm,studentUid,num,teacherlaoshi,sex], function(err, result) {
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
function weiji(studentUid,callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'insert into zhuce (studentUid) values (?)';
		conn.query(sql, [studentUid], function(err, result) {
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


module.exports=router;