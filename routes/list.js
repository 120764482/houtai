
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
function getAllUsers(cal){
	pool.getConnection(function(err,conn){
		var sql='select * from list';
		conn.query(sql,function(err,result){
			//console.log("result:"+result)
			if(err){
				console.log("getAllUsers Error:"+err.message);
				return;
			}
			console.log('aaa')
			conn.release();//释放连接
			cal(err,result);
		})
	})
}


//列表
router.get('/list',function(req,res){
	console.log('sdas')
	getAllUsers(function(err,results){
		if(err){
			console.log(err)
			res.send(err)
		}else if(results){
//			console.log(results)
			res.send(results)
		}
	})
})
////删除
router.post('/shan',function(req,res){
	var id=req.query.Uid
	console.log(id)
	shan(id,function(err,results){
		if(err){
			res.send({flag:2})
		}else if(results.affectedRows>0){
			res.send({flag:1})
		}
	})
})
//
function shan(id,cal){
	pool.getConnection(function(err,conn){
		var sql='delete from list where Uid = ?';
		
		conn.query(sql,[id],function(err,result){
			//console.log("result:"+result)
			if(err){
				console.log("getAllUsers Error:"+err.message);
				return;
			}
			conn.release();//释放连接
			cal(err,result);
		})
	})
}

//查
router.get('/cha',function(req,res){
	var c=req.query.sou;
	console.log(c)
	cha(c,function(err,result){
		if(err){
			res.send(err)
		}else if(result){
			res.send(result)
		}
	})
})
//根据id查询用户
function cha(u, callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'select * from zhuce where Name like "%" ? "%" or classnames like "%" ? "%" or cellphone like "%" ? "%" or studentUid like "%" ? "%"';
		
		conn.query(sql, [u,u,u,u], function(err, result) {
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