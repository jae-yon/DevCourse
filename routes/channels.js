var express = require('express');
var router = express.Router();

// JSON 파일 읽어오기
const fs = require('fs');
const jsonFile = fs.readFileSync('./public/json/channels.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

let channels = new Map();
// JSON 데이터 MAP 객체에 담기
jsonData.forEach((e) => {
  channels.set(e.id, e)
})

console.log(channels)
// 채널 찾기
let findChannel = (id) => {
  return [...channels.values()].find((e) => e.id === id)
}
// 데이터 저장하기
let saveChannel = () => {
  fs.writeFileSync('./public/json/channels.json', JSON.stringify([...channels.values()], null, 2));
}

router
  // 채널생성
  .post('/', function(req, res, next){
    // 예외 처리 : 채널명을 받아왔는지 확인
    if (req.body.channel !== undefined) {
      // 채널 배열 초기화
      let channel = {id: 0, channel: ''}
      // 채널 ID 고유 값 확인 및 설정
      if (channels.size == 0) {
        // 등록된 채널이 없으면 채널 ID = 0 부여
        channel = [channel].map((e) => {
          return {...e, id: 0, channel: req.body.channel} 
        })
        channels.set(channel[0].id, channel[0])
      } else {
        // 등록된 채널 ID 값 중 가장 큰 값에 +1 한 값을 채널 ID로 부여
        channels.forEach((e) => {
          if (channel.id < e.id) {
            channel.id = e.id
          }
        })
        channel.id++
        channel.channel = req.body.channel
        channels.set(channel.id, channel)
      }
      // JSON 파일에 저장
      saveChannel()
      // 저장된 객체 확인 및 호출
      res.status(201).json([...channels.values()])
    } else {
      res.status(400).json({
        message : `잘못된 입력값 입니다`
      })
    }
  })
  // 채널수정
  .put('/:id', function(req, res, next) {
    let {id} = req.params
    id = parseInt(id)
    // 받아온 ID 값과 동일한 ID의 채널 정보 찾기
    let channel = findChannel(id)
    // 예외 처리 : 채널 정보 유무에 따라 응답 호출
    if (channel != undefined) {
      channel = [channel].map((e) => {
        return {...e, channel: req.body.channel}
      })
      channels.set(id, channel[0])
      saveChannel()
      res.status(201).json({
        message : `채널 이름이 변경되었습니다`
      })
    } else {
      res.status(404).json({
        message : `채널 정보를 찾을 수 없습니다`
      })      
    }
  })
  // 채널삭제
  .delete('/:id', function(req, res, next) {
    const {id} = req.params
    id = parseInt(id)
    // 예외 처리
    if (channels.get(id) == undefined) {
      res.status(404).json({
        message : `삭제할 채널이 없습니다`
      })
    } else {
      channels.delete(id)
      res.status(200).json({
        message : `${id}번 채널이 삭제 되었습니다`
      })
      saveChannel()
    }
  })
  // 채널(전체)조회
  .get('/', function(req, res, next) {
    if (channels.size != 0) {
      res.json([...channels.values()])
    } else {
      res.status(404).json({
        message : `조회할 수 있는 채널이 없습니다`
      })
    }
  })
  // 채널조회
  .get('/:id', function(req, res, next) {
    let {id} = req.params
    id = parseInt(id)
    if (channels.get(id) != undefined) {
      res.json(channels.get(id))
    } else {
      res.status(404).json({
        message : `조회할 수 있는 채널이 없습니다`
      })
    }
  })

module.exports = router;