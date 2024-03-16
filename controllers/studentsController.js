const mongodb = require("../data/database.js")
const createObjectId = require('mongodb').ObjectId.createFromHexString;

const getstudent = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = createObjectId(req.params.id);
    const result = await mongodb.getDb().db("project2").collection('student').find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

const getAllStudents = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().db("project2").collection('student').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const createStudent = async (req, res) => {
    //#swagger.tags=['Users']
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        studentId: req.body.studentId,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db("project2").collection('student').insertOne(student);
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}

const updatestudent = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = createObjectId(req.params.id);
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        studentId: req.body.studentId,
        birthday: req.body.birthday
    }

    const response = await mongodb.getDb().db("project2").collection('student').replaceOne({_id: userId}, student);
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}

const deletestudent = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = createObjectId(req.params.id);
    const response = await mongodb.getDb().db("project2").collection('student').deleteOne({_id: userId});
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}
module.exports = {
    getstudent,
    getAllstudents,
    createstudent,
    updatestudent,
    deletestudent
}
