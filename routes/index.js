const router = require('express').Router();
const contacts = require('../controllers/contactsController')

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']rs
    res.send('Hello World');});

router.get('/contacts', contacts.getAllContacts);
router.get('/contacts/:id', contacts.getContact);
router.post('/contacts', contacts.createContact);
router.put('/contacts/:id', contacts.updateContact);
router.delete('/contacts/:id', contacts.deleteContact);


module.exports = router;