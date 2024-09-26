var express = require('express');
var router = express.Router();

var connection = require('../db');

var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();

var {body, param, validationResult} = require('express-validator');

const validate = (req, res, next) => {
  const err = validationResult(req)
  if (err.isEmpty()) {
    return next()
  } else {
    return res.status(400).json({message : err.array()})
  }
}

const notFound = (res) => {
  res.status(404).json({
    message : `일치하는 정보를 찾을 수 없습니다`
  })
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

  .post('/signin',
    [
      body('email').notEmpty().isString().withMessage('이메일 정보가 없습니다'),
      body('password').notEmpty().isString().withMessage('패스워드 정보가 없습니다'),
      validate
    ],
    (req, res) => {
      const {email, password} = req.body
      const sql = `SELECT * FROM users WHERE email = ?`

      connection.query(sql, email, function (err, results) {
        if (err) return res.status(400).send(err)

        if (results[0] && results[0].password == password) {
          // create token
          const token = jwt.sign(
            { email: results[0].email, name: results[0].name }, 
            process.env.SECRET_KEY,
            { expiresIn : '30m', issuer: 'admin' }
          );

          res.cookie('token', token, { httpOnly : true })

          res.status(200).json({
            message : `${results[0].name}님 환영합니다`,
            token : token
          })
        } else {
          res.status(403).json({
            message : `이메일 또는 패스워드가 일치하지 않습니다`
          })
        }
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
        if (err) {
          return res.status(400).send(err)
        }

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
