var express = require('express');
var router = express.Router();

var connection = require('../db');

router
  // email(req.body)로 조회 & 전체 조회
  .get('/', function(req, res) {

    const {email} = req.body

    if (email) {
      let sql = `SELECT * FROM users WHERE email = ?`
      // email 선택 조회
      connection.query(sql, email,
        function (err, results) {
          if (results.length) {
            res.status(201).json(results[0])
          } else {
            res.status(404).json({
              message : `일치하는 회원정보가 없습니다`
            })
          }
        }
      )
    } else {
      // DB를 담아올 객체
      let data = new Map()
      let sql = `SELECT * FROM users`
      // DB전체 조회
      connection.query(sql,
        function (err, results) {
          results.forEach((e) => {
            data.set(e.id, e)
          })
          // 예외 처리 : 회원 정보 존재 여부 판단
          if (data.size != 0) {
            res.status(201).json([...data.values()])
          } else {
            res.status(404).json({
              message : `회원정보가 존재하지 않습니다`
            })
          }
        }
      )
    }

  })

  // id(req.params)로 조회
  .get('/:id', function(req, res) {

    const {id} = req.params
    let sql = `SELECT * FROM users WHERE id = ${id}`
    // ID 값으로 DB 선택 조회
    connection.query(sql,
      function (err, results) {
        // DB를 담아올 객체
        let data = new Map()

        results.forEach((e) => {
          data.set(e.id, e)
        })
        // 예외 처리 : 회원 정보 존재 여부 판단
        if (data.size != 0) {
          res.status(201).json([...data.values()])
        } else {
          res.status(404).json({
            message : `일치하는 회원정보가 없습니다`
          })
        }
      }
    )

  })

  // 회원가입
  .post('/signup', function(req, res){
    
    const {email, name, password, contact} = req.body
    
    // 예외 처리 : 회원 정보 값들이 다 들어왔는지 확인
    if (email == '' || name == '' || password == '') {
      res.status(404).json({
        message : `입력받은 회원 정보가 없습니다`
      })
    } else {
      let sql = `SELECT email FROM users WHERE email = ?`
      connection.query(sql, email,
        function (err, results) {
          if (results.length) {
            res.status(404).json({
              message : `이미 사용중인 이메일입니다`
            })
          } else {
            sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
            connection.query(sql, [email, name, password, contact],
              function (err, results) {
                res.status(200).json({
                  message : `계정등록이 정상적으로 완료되었습니다`
                })
              }
            )
          }
        }
      )
    }

  })

  // 계정삭제
  .delete('/', function(req, res) {

    const {email} = req.body
    let sql = `DELETE FROM users WHERE email = ?`
    if (email) {
      connection.query(sql, email,
        function (err, results) {
          if (results.affectedRows == 0) {
            res.status(404).json({
              message : `일치하는 회원 정보가 없거나, 이미 삭제된 계정입니다`
            })
          } else {
            res.status(200).json({
              message : `회원 정보가 정상적으로 삭제되었습니다`
            })
          }
        }
      )
    } else {
      res.status(404).json({
        message : `입력받은 회원 정보가 없습니다`
      })
    }
    
  })

  // 로그인
  .post('/signin', function(req, res){
    
    const {email, password} = req.body

    if (email == '' || password == '') {
      res.status(404).json({
        message : `입력받은 회원 정보가 없습니다`
      })
    } else {
      let sql = `SELECT * FROM users WHERE email = ?`
      connection.query(sql, email,
        function (err, results) {
          let user = results[0]

          if (user && user.password == password) {
            res.status(201).json({
              message : `${user.name}님이 로그인되었습니다`
            })
          } else {
            res.status(404).json({
              message : `회원정보가 일치하지 않습니다`
            })
          }
        }
      )
    }
  })

module.exports = router;
