const express=require('express');
// 引入连接池
const pool=require('../pool');
// 创建路由
var  router=express.Router();

// 创建接口
// 1.-login
router.post('/login',(req,res)=>{
    var $uname=req.body.uname;
    var $upwd=req.body.upwd;
    if(!$uname){
        res.send('用户名未输入');
        return;
    }
    if(!$upwd){
        res.send('密码未输入');
        return;
    }
    var sql='select * from xz_user where uname=? and upwd=?';
    pool.query(sql,[$uname,$upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send('登入成功');
        }else{
            res.send('登入失败');
        }
    })
});
// 2.-userlist
router.get('/userlist',(req,res)=>{
    var sql='select * from xz_user';
    pool.query(sql,(err,result)=>{
        res.send(result);
    })
});
//3.-deleteUser
router.get('/deleteUser',(req,res)=>{
    var $uid=req.query.uid;
    if(!$uid){
        res.send('0');//未接受到uid
        return;
    }
    var sql='delete from xz_user where uid=?';
    pool.query(sql,[$uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('1');//删除成功
        }else{
            res.send('2')//uid不存在
        }
    })
})
//4.-selectUser
router.get('/selectUser',(req,res)=>{
    var $uid=req.query.uid;
    if(!$uid){
        res.send('0');//uid为空
        return;
    }
    var sql='select * from xz_user where uid=?'
    pool.query(sql,[$uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(result[0]);
        }else{
            res.send('1');//不存在uid,没有查询到信息
        }
    })
})
// 5.-updataUser
router.post('/updateUser',(req,res)=>{
    var obj=req.body;
    var $uid=obj.uid;
    var $upwd=obj.upwd;
    var $email=obj.email;
    var $phone=obj.phone;
    var $user_name=obj.user_name;
    var $gender=obj.gender;
    var $uname=obj.uname;
    for(var key in obj){
        if(!obj[key]){
            res.send(key+'0');
            return;
        }
    }
    sql='update xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? where uid=?';
    pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],(err,result)=>{
        if(err) throw err;
        res.send('1');
    })
})
//6.-checkUser
router.get('/checkUser',(req,res)=>{
    var $uname=req.query.uname;
    if(!$uname){
        res.send($uanme+'0');
        return;
    }
    sql='select * from xz_user where uname=?';
    pool.query(sql,[$uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send('1');
        }else{
            res.send('0');
        }
    })
})
//7.-register
router.post('/register',(req,res)=>{
    var obj=req.body;
    for(var key in obj){
        if(!obj[key]){
            res.send(key+'0');
            return;
        }
    }
    
    sql='insert into xz_user set ?';
    pool.query(sql,[obj],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('注册成功');
        }else{
            res.send('注册失败');
        }
    })

})
//导出路由
module.exports=router;