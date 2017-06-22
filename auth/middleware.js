function ensureLoggedIn(req, res, next) {
  console.log(req.signedCookies)
  if (req.signedCookies.user_id) {
    next()
  } else {
    res.status(420)
    next(new Error('unauthorized'))
  }
}

function allowAccess(req, res, next) {
  if (req.signedCookies.user_id == req.params.id) {
    next()
  } else {
    res.status(420)
    next(new Error('unauthorized'))
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess
}
