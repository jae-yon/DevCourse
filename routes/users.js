var express = require('express');
var router = express.Router();

const connection = require('../db');
const {body, param, validationResult} = require('express-validator');

const notFound = (res) => {
  res.status(404).json({
    message : `일치하는 정보를 찾을 수 없습니다`
  })
}

const validate = (req, res, next) => {
  const err = validationResult(req)
  if (!err.isEmpty()) {
    return res.status(400).json({message : err.array()})
  } else {
    return next()
  }
}

router

  .get('/',
    [
      body('email').notEmpty().isString(), validate
    ],
    (req, res) => {
      const {email} = req.body
      const sql = `SELECT * FROM users WHERE email = ?`

      connection.query(sql, email, function (err, results) {
        if (results.length) {
          res.status(201).json(results[0])
        } else {
          notFound(res)
        }
      })
    }
  )

  .get('/:id',
    [
      param('id').notEmpty(), validate
    ],
    (req,res) => {
      const {id} = req.params
      const sql = `SELECT * FROM users WHERE id = ${id}`

      connection.query(sql, function (err, results) {
        if (results.length) {
          res.status(201).json(results[0])
        } else {
          notFound(res)
        }
      })
    }
  )

  .post('/signup',
    [
      body('email').notEmpty().isString(),
      body('name').notEmpty().isString(),
      body('password').notEmpty().isString(),
      validate
    ],
    (req, res) => {
      const {email, name, password, contact} = req.body
      const sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
      connection.query(sql, [email, name, password, contact], function (err, results) {
        if (err) return res.status(400).send(err)
        res.status(201).json([ results, { msg : `success` } ])
      })
    }
  )

  .delete('/',
    [
      body('email').notEmpty().isString(), validate
    ],
    (req, res) => {
      const {email} = req.body
      const sql = `DELETE FROM users WHERE email = ?`

      connection.query(sql, email, function (err, results) {
        if (results.affectedRows == 0) {
          notFound(res)
        } else {
          res.status(200).json({
            message : `회원 정보가 정상적으로 삭제되었습니다`
          })
        }
      })
    }
  )
  
module.exports = router;
