var express = require('express');
var mysql = require('mysql');
var router = express.Router();

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
router.post('/add', function(req, res) {
	var banji=req.body.banji;
	save(banji, function(err, result) {
		if(err){
			res.send({flag:2})
		}else if(result){
			res.send({flag:1})
		}
	}) 
})

function save(banji, callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'insert into banji (banji) values (?)';
		conn.query(sql, [banji], function(err, result) {
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
router.get('/banji',function(req,res){
	console.log('sdas')
	getAllUsers(function(err,results){
		if(err){
			res.send(err)
		}else if(results){
			res.send(results)
		}
	})
})
function getAllUsers(cal){
	pool.getConnection(function(err,conn){
		var sql='select * from banji';
		conn.query(sql,function(err,result){
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

//删除
router.post('/shan', function(req, res) {
		var banji = req.query.banji
		console.log(banji)
		shan(banji, function(err, results) {
			if(err) {
				res.send({
					flag: 2
				})
			} else if(results.affectedRows > 0) {
				res.send({
					flag: 1
				})
			}
		})
	})
	//
function shan(banji, cal) {
	pool.getConnection(function(err, conn) {
		var sql = 'delete from banji where banji = ?';

		conn.query(sql, [banji], function(err, result) {
			//console.log("result:"+result)
			if(err) {
				console.log("getAllUsers Error:" + err.message);
				return;
			}
			conn.release(); //释放连接
			cal(err, result);
		})
	})
}
module.exports = router;