/*
Imports
*/
const { Contact } = require('../models/index')
const { buildContactEmail } = require('../services/emailTemplate')
const emailService = require('../services/emailService')

/*
Controllers contacts
*/
const getContacts = async (req, res) => {
  try {
    const { limit, offset } = req.query
    const contactList = await Contact.findAndCountAll({
      attributes: ['id', 'name', 'phone', 'email', 'message', 'createdAt'],
      offset: Number(offset),
      limit: Number(limit),
      order: [['createdAt', 'DESC']]
    })
    res.status(200).json({
      ok: true,
      data: contactList
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error.message
    })
  }
}

const postContact = async (req, res) => {
  try {
    await emailService(req.body.email, 'Somos Mas: Consulta recibida', buildContactEmail(req.body.name))
    await Contact.create(req.body)
    return res.status(201).json({ ok: true, msg: 'Contact message saved succesfully' })
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message })
  }
}

module.exports = { getContacts, postContact }
