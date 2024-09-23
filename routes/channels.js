var express = require('express');
var router = express.Router();

var connection = require('../db');

router

  // name(req.body)로 조회 & 전체 조회
  .get('/', function(req, res, next) {

    const {name} = req.body

    if (name) {
      let sql = `SELECT * FROM channels WHERE name = ?`
      connection.query(sql, name, function (err, results) {
          if (results.length) {
            res.status(201).json(results[0])
          } else {
            res.status(404).json({
              message : `일치하는 채널정보가 없습니다`
            })
          }
      })
    } else {
      let sql = `SELECT * FROM channels`
      connection.query(sql, function (err, results) {
        if (results.fieldCount == 0) {
          res.status(404).json({
            message : `일치하는 채널정보가 없습니다`
          })
        } else {
          res.status(201).json(results)
        }
      })
    }
  })

  // id(req.params)로 조회
  .get('/:id', function(req, res, next) {

    const {id} = req.params

    let sql = `SELECT * FROM channels WHERE user_id = ${id}`
    // ID 값으로 DB 선택 조회
    connection.query(sql, function (err, results) {
      if (results.fieldCount == 0) {
        res.status(404).json({
          message : `일치하는 채널정보가 없습니다`
        })
      } else {
        res.status(201).json(results)
      }
    })

  })

  // 채널생성
  .post('/', function(req, res, next){

    const {name, user_id} = req.body

    if (name == '' || user_id == '') {
      res.status(404).json({
        message : `입력 정보가 잘못되었습니다`
      })
    } else {
      let sql = `SELECT id FROM users WHERE id = ?`
      connection.query(sql, user_id, function (err, results) {
        if (!results.length) {
          res.status(404).json({
            message : `회원 정보가 없습니다`
          })
        } else {
          sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`
          connection.query(sql, [name, user_id], function (err, results) {
            res.status(200).json({
              message : `채널 등록에 성공하였습니다`
            })
          })
        }
      })
    }

  })

  // 채널수정
  .put('/', function(req, res, next) {
    const {id, name} = req.body

    if (name == '' || id == '') {
      res.status(404).json({
        message : `입력 정보가 잘못되었습니다`
      })
    } else {
      let sql = `UPDATE channels SET name = ? WHERE id = ${id}`
      connection.query(sql, name, function (err, results) {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message : `채널을 수정할 수 없습니다`
          })
        } else {
          res.status(201).json({
            message : `채널명이 성공적으로 수정되었습니다`
          })
        }
      })
    }
  })

  // 채널삭제
  .delete('/', function(req, res, next) {
    const {id} = req.body

    let sql = `DELETE FROM channels WHERE id = ?`

    if (!id) {
      connection.query(sql, id, function (err, results) {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message : `삭제할 채널 정보가 없습니다`
          })
        } else {
          res.status(201).json({
            message : `채널이 성공적으로 삭제되었습니다`
          })
        }
      })
    } else {
      res.status(404).json({
        message : `채널을 삭제할 수 없습니다`
      })
    }

  })
  
module.exports = router;