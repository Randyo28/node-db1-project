exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body

  if (!name || !budget) {
    res.status(400).json({ message: 'name and budget are required' })
  } else if (name instanceof !String) {
    res.status(400).json({ message: 'name of account must be a string' })
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
