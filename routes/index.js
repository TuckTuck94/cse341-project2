const router = require('express').Router();
const students = require('../controllers/studentsController')

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']rs
    res.send('Hello World');});

router.get('/students', students.getAllstudents);
router.get('/students/:id', students.getstudents);
router.post('/students', students.createstudents);
router.put('/students/:id', students.updatestudents);
router.delete('/students/:id', students.deletestudents);


module.exports = router;