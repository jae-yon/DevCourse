var express = require('express');
var router = express.Router();

let arr = [1, 2, 3, 4, 5]

let foreachArr = arr.forEach((element, index, array) => {
	// console.log(`foreach > element: ${element}, index: ${index}, array: ${array}`)
	return element * element
})

let mapArr = arr.map((element, index, array) => {
	// console.log(`map > element: ${element}, index: ${index}, array: ${array}`)
	return element * element
})
// console.log(`return of foreach method: ${foreachArr}`)
// console.log(`return of map method: ${mapArr}`)

router.get('/', (req, res, next) => {
  res.send('Hello World');
});

module.exports = router;
