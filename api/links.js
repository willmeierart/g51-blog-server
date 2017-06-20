const express = require('express');
const router = express.Router();
const queries = require('../db/queries')

const isValidId = (req, res, next) => {
  if (!isNaN(req.params.id)) {
    return next()
  } else {
    next(new Error('wrong'))
  }
}

const isValidLink =(link)=>{
    const hasURL = typeof link.url == "string" && link.url.trim() != '' && link.url.match(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/) != null
    const hasDescription = typeof link.description == "string" && link.description.trim() != ''
    return hasURL && hasDescription
}

router.get('/', (req, res) => {
  queries.getAllLinks().then((links) => {
      res.json(links);
    })
})
router.post('/', (req, res, next) => {
    queries.create(req.body, 'posts').then(link => {
      if(link) res.json(link)
      else next(new Error('invalid link'))
   })
})
router.put('/:id', isValidId, (req,res,next)=>{
    if (isValidLink(req.body)){
        queries.update(req.params.id, req.body, 'links').then(link =>{res.json(link[0])})
    } else {next(new Error('invalid link'))}
})
router.delete('/:id',isValidId, (req,res)=>{
    queries.delete(req.params.id, 'links').then(()=>{res.json({deleted:true})})
})


module.exports = router
