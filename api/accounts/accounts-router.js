const router = require('express').Router()
const Accounts = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('../accounts/accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then((account) => {
      res.json(account)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', checkAccountId, (req, res) => {
  res.status(200).json(req.account)
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack }) // eslint-disable-line
})

module.exports = router
