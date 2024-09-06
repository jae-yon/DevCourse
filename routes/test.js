var express = require('express');
var router = express.Router();

// JSON 파일 읽어오기
const fs = require('fs');
const jsonFile = fs.readFileSync('./public/json/fruits.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

let db = new Map();
// 맵 객체에 JSON데이터 담기
jsonData.map((element, index) => {
  db.set(index, element);
});

const saveFile = () => {
  fs.writeFileSync('./public/json/test.json', JSON.stringify([...db.values()], null, 2));
}

// GET : 객체 전체 조회
router.get('/', (req, res) => {

  if (db.size >= 1) {

    let jsonObject = {}

    db.forEach((value, key) => {
      jsonObject[key] = value;
    });
    res.json(jsonObject);
    // res.json([...db.values()]);

  } else {
    res.json({ message : "This object's value does not exist." });
  }

});

// GET : 객체 개별(선택) 조회
router.get('/:id', (req, res) => {

  let {id} = req.params;
  id = parseInt(id);

  if (db.get(id) == undefined) {
    res.json({ message : "This value does not exist." });
  } else {
    res.json(db.get(id));
  }

});

// DELETE : 객체 전체 삭제
router.delete('/', (req, res) => {

  if (db.size >= 1) {

    // 전체 삭제
    db.clear();
    saveFile();
    res.json({ message : "success" });
    
  } else {
    res.json({ message : "This object's value does not exist." });
  }

});

// DELETE : 객체 개별(선택) 삭제
router.delete('/:id', (req, res) => {

  let {id} = req.params;
  id = parseInt(id);
  
  if (db.get(id) == undefined) {
    res.json({ message : "This value does not exist." });
  } else {

    // 선택한 값을 삭제
    db.delete(id);

    let jsonObject = {}
    db.forEach((value, key) => {
      jsonObject[key] = value;
    });
    res.json(jsonObject);

    saveFile();

  }
  
});

// PUT : 객체 개별(선택) 수정
router.put('/:id', (req, res) => {

  let {id} = req.params;
  id = parseInt(id);
  
  if (db.get(id) == undefined) {
    res.json({ message : "This value does not exist." });
  } else {
    // 받아온 값 덮어쓰기
    db.set(id, req.body);
    saveFile();
    res.json({ message : `The values of object ${id} have been changed.` });
  }

});

// POST
router.post('/', (req, res) => {

  let id = db.size;
  db.set(id, req.body);
  saveFile();
  // 응답
  res.json({ message : `${db.get(id).name} is tasty!` });
  
});

module.exports = router;