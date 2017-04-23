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
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
//分页
router.get('/fenye', function(req, res) {
	getAllUsers(function(err, result) {
		var total = result.length
		if(err) {
			res.send(err)
		} else if(result) {
			//console.log(result)
			var pageNum = req.query.pageNum;
			//console.log(pageNum)
			var pageSize = 2;
			var pageNums = (pageNum - 1) * pageSize
			getfenye(pageNums, pageSize, function(err, result) {
				var totalPage = Math.ceil(total / pageSize);
				var data = {
					total: total,
					pageSize: pageSize,
					totalPage: totalPage,
					list: result
				};
				res.send(data)
			})
		}

	})
})
function getfenye(sta, len, callback) {
	pool.getConnection(function(err, connection) {
		var sql = "select * from list limit ?,?";
		connection.query(sql, [sta, len], function(err, result) {
			if(err) {
				console.log("getALLUsersOU Error:" + err.message);
				return;
			}
			connection.release(); //释放链接
			callback(err, result)

		})
	})
}

function getAllUsers(callback) {
	pool.getConnection(function(err, connection) {
		var sql = "select * from list"; //表名
		connection.query(sql, function(err, result) {
			if(err) {
				console.log("getAllUsers Error:" + err.message);
				return;
			}
			connection.release(); //释放连接  防止占用连接--避免数据通畅
			callback(err, result) //要传递的数据===实参
		})
	})
}



////删除
router.post('/shan', function(req, res) {
		var id = req.query.id
		console.log(id)
		shan(id, function(err, results) {
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
function shan(id, cal) {
	pool.getConnection(function(err, conn) {
		var sql = 'delete from list where Uid = ?';

		conn.query(sql, [id], function(err, result) {
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

//查
router.get('/cha', function(req, res) {
		var c = req.query.sou;
		console.log(c)
		cha(c, function(err, result) {
			if(err) {
				res.send(err)
			} else if(result) {
				res.send(result)
			}
		})
	})
	//根据信息查询用户
function cha(c, callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'select * from list where Name like "%" ? "%" or classnames like "%" ? "%" or cellphone like "%" ? "%" or studentUid like "%" ? "%"';

		conn.query(sql, [c, c, c, c], function(err, result) {
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
//班级查询
router.get('/ban', function(req, res) {
		var c = req.query.sou;
		console.log(c)
		cha(c, function(err, result) {
			if(err) {
				res.send(err)
			} else if(result) {
				res.send(result)
			}
		})
	})
	//根据信息查询用户
function cha(c, callback) {
	pool.getConnection(function(err, conn) {
		var sql = 'select * from list where  classnames like "%" ? "%" ';

		conn.query(sql, [c], function(err, result) {
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
module.exports = router;