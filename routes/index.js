const router = require('express').Router();
const contacts = require('../controllers/contactsController')

router.get('/', (req, res) => { res.send('Hello World');});
router.get('/contacts', contacts.getAllContacts);
router.get('/contacts/:id', contacts.getContact);

module.exports = router;