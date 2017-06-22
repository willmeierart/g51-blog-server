const express = require('express');
const router = express.Router();
const queries = require('../db/queries')
const authMiddleware = require('../auth/middleware')

const isValidId = (req, res, next) => {
  if (!isNaN(req.params.id)) {
    return next()
  } else {
    next(new Error('wrong'))
  }
}

const isValidPost =(posts)=>{
    const hasTitle = typeof posts.title == "string" && posts.title.trim() != ''
    const hasContent = typeof posts.content == "string" && posts.content.trim() != ''
    return hasTitle && hasContent
}

router.get('/', (req, res) => {
  queries.getAllPosts().then(posts => {
      res.json(posts);
    })
})
router.get('/:id', isValidId, (req, res) => {
    queries.getPost(req.params.id).then(posts =>{
         res.json(posts[0])
    })
})
router.post('/', authMiddleware.ensureLoggedIn, (req, res, next) => {
    queries.create(req.body, 'posts').then(posts => {
      if(posts) res.json(posts)
      else next(new Error('invalid post'))
  })
})
router.put('/:id', authMiddleware.ensureLoggedIn, isValidId, (req,res,next)=>{
    if (isValidPost(req.body)){
        queries.update(req.params.id, req.body, 'posts').then(posts =>{res.json(posts[0])})
    } else {next(new Error('invalid post'))}
})
router.delete('/:id', authMiddleware.ensureLoggedIn, isValidId, (req,res)=>{
    queries.delete(req.params.id, 'posts').then(()=>{res.json({deleted:true})})
})


module.exports = router
