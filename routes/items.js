const ExpressError = require("../expressError")
const express = require('express');
const router = new express.Router();
const items = require("../fakeDb")

router.get("/", function (req, res) {
  res.json({ items })
})

router.post('/', (req, res, next) => {
    try{

      if (!req.body.name && !req.body.price) {
        throw new ExpressError('Name and Price are required!', 400);
    }
    

      const newItem = {name: req.body.name, price: req.body.price}
      items.push(newItem)
      return res.status(201).json({ item: newItem})
    }catch (e) {
      return next(e)
    }
  });

router.get('/:name', (req,res,next) => {
        const foundItem = items.find(item => item.name === req.params.name);
        if(foundItem === undefined) {
          throw new ExpressError('Item not found', 404)
        }
        res.json({ item: foundItem })
});


router.patch('/:name', (req, res, next) => {
  const foundItem = items.find(item => item.name === req.params.name)
  if(foundItem === undefined){
    throw new ExpressError('Item not found', 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  res.json({ item: foundItem })
})
  

  router.delete('/:name', (req, res, next) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (!foundItem) {
      throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: 'Deleted Item' })
  })

module.exports = router;
