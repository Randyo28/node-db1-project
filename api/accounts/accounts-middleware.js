const Account = require('../accounts/accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body

  const trimName = name.trim()

  if (!name || !budget) {
    res.status(400).json({ message: 'name and budget are required' })
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string' })
  } else if (trimName.length < 3 || trimName.length > 100) {
    res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' })
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: 'budget of account must be a number' })
  } else if (budget < 0 || budget > 10000000) {
    res
      .status(400)
      .json({ message: 'budget of account is too large or too small' })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // const { name } = req.body
  // const trimName = name.trim()

  const unique = db('accounts').where('name').unique()

  if (!unique) {
    res.status(404).json({ message: 'that name is taken' })
  } else {
    next()
  }
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params

  Account.getById(id)
    .then((account) => {
      if (account) {
        req.account = account
        next()
      } else {
        res.status(404).json({ message: 'Account not found' })
      }
    })
    .catch((err) => {
      next(err)
    })
}
