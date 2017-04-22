var express = require('express');
var mysql=require('mysql');
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


//登录
router.post('/denglu',function(req,res){
	console.log("into denglu...")
	var uname=req.body.account;
	var pwd=req.body.password;
	var quanxian=req.body.jurisdiction;
	console.log(quanxian)
	find(uname,function(err,result){
		console.log(result)
		if(result.length==0){
			res.send({flag:2})//用户名不存在
		}else if(result.length>0){
			if(pwd==result[0].password){
				if(quanxian==result[0].jurisdiction){
					res.send({flag:1})
				}else if(quanxian!=result[0].jurisdiction){
					res.send({flag:5})
				}
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
		var sql='select * from login where account = ?';
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


module.exports=router;