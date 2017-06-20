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

const isValidUser =(users)=>{
    const hasName = typeof users.name == "string" && users.name.trim() != ''
    const hasUsername = typeof users.username == "string" && users.username.trim() != ''
    const hasEmail = typeof users.email == "string" && users.email.trim() != '' && users.email.match(/([@])/g) != null
    const hasPassword = typeof users.password == "string" && users.password.trim() != ''
    return hasName && hasUsername && hasEmail && hasPassword
}

router.get('/', (req, res) => {
  queries.getAllUsers().then(users => {
      res.json(users);
    })
})
router.get('/:id', isValidId, (req, res) => {
    queries.getUser(req.params.id).then(users =>{
         res.json(users[0])
    })
})
router.post('/', (req, res, next) => {
    queries.create(req.body, 'users').then(user => {
      if(user) res.json(user)
      else next(new Error('try again'))
  })
})
router.put('/:id', isValidId, (req,res,next)=>{
    if (isValidUser(req.body)){
        queries.update(req.params.id, req.body, 'users').then(users =>{res.json(users[0])})
    } else {next(new Error('try again'))}
})
router.delete('/:id',isValidId, (req,res)=>{
    queries.deleteUser(req.params.id, 'users').then(()=>{res.json({deleted:true})})
})


module.exports = router
