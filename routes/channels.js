var express = require('express');
var router = express.Router();

const connection = require('../db');
const {body, param, validationResult} = require('express-validator');

const notFound = (res) => {
  res.status(404).json({
    message : `일치하는 정보를 찾을 수 없습니다`
  })
}

const validate = (req, res) => {
  const err = validationResult(req)
  if (!err.isEmpty()) return res.status(400).json({message : err.array()})
}

router

  .get('/',
    [
      body('name').notEmpty().isString(), validate
    ],
    (req, res) => {
      const {name} = req.body
  
      connection.query(`SELECT * FROM channels WHERE name = ?`, name, function (err, results) {
        if (results.length) {
          res.status(200).json(results[0])
        } else {
          return notFound(res)
        }
      })
    }
  )

  .get('/:id',
    [
      param('id').notEmpty(), validate
    ],
    (req, res) => {
      const {id} = req.params

      connection.query(`SELECT * FROM channels WHERE user_id = ${id}`, function (err, results) {
        if (results.length) {
          res.status(200).json(results)
        } else {
          return notFound(res)
        }
      })
    }
  )

  .post('/', 
    [
      body('name').notEmpty().isString().withMessage('입력 정보가 잘못되었습니다'),
      body('user_id').notEmpty().isInt().withMessage('입력 정보가 잘못되었습니다'),
      validate
    ],
    (req, res) => {
      const {name, user_id} = req.body
      const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`

      connection.query(sql, [name, user_id], function (err, results) {

        if (err) return res.status(400).send(err)

        res.status(201).json([ results, { msg : `success` } ])

      })
    }
  )

  .put('/',
    [
      body('id').notEmpty().isInt().withMessage('ID 정보가 잘못되었습니다'),
      body('name').notEmpty().isString().withMessage('입력 정보가 잘못되었습니다'),
      validate
    ],
    (req, res) => {
      const {id, name} = req.body
      const sql = `UPDATE channels SET name = ? WHERE id = ${id}`

      connection.query(sql, name, function (err, results) {
        if (results.affectedRows == 0) {
          return notFound(res)
        } else {
          res.status(200).json({
            message : `채널명이 성공적으로 수정되었습니다`
          })
        }
      })
    }
  )

  .delete('/',
    [
      body('id').notEmpty().isInt().withMessage('ID 정보가 잘못되었습니다'), validate
    ],
    (req, res) => {
      const {id} = req.body

      connection.query(`DELETE FROM channels WHERE id = ?`, parseInt(id), function (err, results) {
        if (results.affectedRows == 0) {
          return notFound(res)
        } else {
          res.status(200).json({
            message : `채널이 성공적으로 삭제되었습니다`
          })
        }
      })
    }
  )

module.exports = router;