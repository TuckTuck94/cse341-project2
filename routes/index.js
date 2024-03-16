const router = require('express').Router();
const contacts = require('../controllers/studentsController')

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']rs
    res.send('Hello World');});

router.get('/contacts', contacts.getAllstudents);
router.get('/contacts/:id', contacts.getstudent);
router.post('/contacts', contacts.createstudent);
router.put('/contacts/:id', contacts.updatestudent);
router.delete('/contacts/:id', contacts.deletestudent);


module.exports = router;