var express = require('express');
var router =express.Router();
var mysql=require('mysql');
var pool = mysql.createPool({
	host: '192.168.48.238',
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

//注册
router.post('/zhuce',function(req,res){
	console.log('into zhuce>>>>')
	var username=req.body.username;
	var name=username;
	var grade=req.body.grade;
	var classnames=grade;
	var password=req.body.password;
	var account=req.body.account;
	var qqemail=req.body.qqemail;
	console.log(username)
	find(username,function(err,result){
		if(result==""||result==null){
			console.log('insert into mysql')
			login(Name,password,account,grade,jurisdiction,qqemail,function(err,result){
				if(result.insertId>0){
					res.send({flag:1})//注册成功
				}
				
			})//注册成功
			list(name,classnames,function(err,result){
				if(result.insertId>0){
					res.send({flag:1})//注册成功
				}
				
			})//注册成功
			weiji(function(err,result){
				if(result.insertId>0){
					res.send({flag:1})//注册成功
				}
				
			})//注册成功
			yuekao(function(err,result){
				if(result.insertId>0){
					res.send({flag:1})//注册成功
				}
				
			})//注册成功
			zhoukao(function(err,result){
				if(result.insertId>0){
					res.send({flag:1})//注册成功
				}
				
			})//注册成功
		}else if(result!=""||result!=null){
			res.send({flag:2})//用户名被占用
		}else{
			res.send({flag:3})//失败
		}
	})
})

//登录
router.post('/denglu',function(req,res){
	console.log("into denglu...")
	var uname=req.body.username;
	var pwd=req.body.password;
	console.log('uname:'+uname)
	find(uname,function(err,result){
		console.log(result)
		if(result.length==0){
			res.send({flag:2})//用户名不存在
		}else if(result.length>0){
			if(pwd==result[0].password){
				res.send({flag:1})
			}else if(pwd!=result[0].password){
				res.send({flag:3})
			}
		}else{
			res.send({flag:4})//登录失败
		}
	})
})

//根据用户名查询用户
function find(uname,callback){
	pool.getConnection(function(err,conn){
		var sql='select * from login where username = ?';
		conn.query(sql,[uname],function(err,result){
			console.log('sasd:'+result)
			if(err){
				console.log("getAllUsers Error:"+err.message);
				return;
			}
			conn.release();//释放连接
			callback(err,result);
			
			
		})
	})
}

//保存到login表格
function login(uname,pwd,account,grade,quanxian,email,callback){
	pool.getConnection(function(err,conn){
		var sql='insert into zhuce (Name,password,account,grade,jurisdiction,qqemail) values (?,?,?,?,?,?)';
		conn.query(sql,[uname,pwd,account,grade,quanxian,email],function(err,result){
			if(err){
				console.log('insertUser:'+err.message);
				return;
			}
			conn.release();//释放连接
			console.log("dasdasdasd")
			callback(err,result);
		})
	})
}
//保存到list表格
function list(uname,class,callback){
	pool.getConnection(function(err,conn){
		var sql='insert into zhuce (name,classnames) values (?,?)';
		conn.query(sql,[uname,class],function(err,result){
			if(err){
				console.log('insertUser:'+err.message);
				return;
			}
			conn.release();//释放连接
			console.log("dasdasdasd")
			callback(err,result);
		})
	})
}
////保存到weiji表格
//function weiji(id,callback){
//	pool.getConnection(function(err,conn){
//		var sql='insert into zhuce (studentUid) values (?)';
//		conn.query(sql,[id],function(err,result){
//			if(err){
//				console.log('insertUser:'+err.message);
//				return;
//			}
//			conn.release();//释放连接
//			console.log("dasdasdasd")
//			callback(err,result);
//		})
//	})
//}
////保存到yuekao表格
//function yuekao(id,callback){
//	pool.getConnection(function(err,conn){
//		var sql='insert into zhuce (studentUid) values (?)';
//		conn.query(sql,[id],function(err,result){
//			if(err){
//				console.log('insertUser:'+err.message);
//				return;
//			}
//			conn.release();//释放连接
//			console.log("dasdasdasd")
//			callback(err,result);
//		})
//	})
//}
////保存到zhoukao表格
//function zhoukao(id,callback){
//	pool.getConnection(function(err,conn){
//		var sql='insert into zhuce (studentuid) values (?)';
//		conn.query(sql,[id],function(err,result){
//			if(err){
//				console.log('insertUser:'+err.message);
//				return;
//			}
//			conn.release();//释放连接
//			console.log("dasdasdasd")
//			callback(err,result);
//		})
//	})
//}
module.exports=router;