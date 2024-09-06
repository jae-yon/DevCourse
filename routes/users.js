var express = require('express');
var router = express.Router();

let users = new Map();

router
  // 회원가입
  .post('/signup', function(req, res, next){
    // 예외 처리 : 회원 정보 값들이 다 들어왔는지 확인
    if (req.body.id !== undefined && req.body.pw !== undefined && req.body.name !== undefined) {
      // 예외 처리 : 중복되는 ID 값인지 확인
      if ([...users.values()].find((e) => e.id === req.body.id)) {
        res.send(`"${req.body.id}" is already used`)
      } else {
        users.set(req.body.id, req.body)
        res.send(users.get(req.body.id))
      }
    } else {
      res.status(400).send("Error")
    }
    console.log(users)
  })
  // 로그인
  .post('/signin', function(req, res, next){
    // 예외 처리 : ID와 PW 값들이 다 들어왔는지 확인
    if (req.body.id !== undefined && req.body.pw !== undefined) {
      const user = [...users.values()].find((e) => e.id === req.body.id)
      if (user != undefined && user.pw == req.body.pw) {
        // ID와 PW가 일치할 때
        res.send(`welcome "${user.name}"`)
      } else if (user == undefined) {
        // ID가 없을 때
        res.send(`cannot find the id`)
      } else {
        // PW가 일치하지 않을 때
        res.send(`incorrect password`)
      }
    } else {
      res.status(400).send("Error")
    }
  })
  // 회원 조회
  .get('/', function(req, res, next) {
    // 예외 처리 : 회원 정보 존재 여부 판단
    if (users.size != 0) {
      res.json([...users.values()])
    } else {
      res.send(`The "users" value does not exist`)
    }
  })
  // 회원 개별(선택) 조회
  .get('/:id', function(req, res, next) {
    const {id} = req.params
    const user = [...users.values()].find((e) => e.id == id)
    if (user != undefined) {
      res.json([user])
    } else {
      res.send(`cannot find the id`)
    }
  })
  // 회원 개별(선택) 수정
  .put('/:id', function(req, res, next) {
    let {id} = req.params
    let user = [...users.values()].find((e) => e.id == id)
    if (user != undefined) {
      user = [user].map((e) => {
        return {...e, pw: req.body.pw, name: req.body.name}
      })
      users.set(id, user)
      res.json(users.get(id))
    } else {
      res.send(`cannot find the id`)
    }

  })
  // 회원 개별(선택) 삭제
  .delete('/:id', function(req, res, next) {
    const {id} = req.params
    // 예외 처리
    if (users.get(id) == undefined) {
      res.json({ message : "This value does not exist." });
    } else {
      users.delete(id)
      res.json(users)
    }
  })
  

module.exports = router;
