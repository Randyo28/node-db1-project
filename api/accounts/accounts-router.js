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

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    const { name, budget } = req.body
    Accounts.create({ name, budget })
      .then((account) => {
        res.status(201).json(account)
      })
      .catch((err) => {
        next(err)
      })
  }
)

router.put(
  '/:id',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    const { id } = req.params
    const changes = req.body

    Accounts.updateById(id, changes)
      .then((account) => {
        res.status(200).json(account)
      })
      .catch((err) => {
        next(err)
      })
  }
)

router.delete('/:id', (req, res, next) => {
  const { id } = req.params

  Accounts.deleteById(id)
    .then((account) => {
      res.json(account)
    })
    .catch((err) => {
      next(err)
    })
})

router.use((err, req, res) => {
  // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router
