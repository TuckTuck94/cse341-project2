const mongodb = require("../data/database.js")
const createObjectId = require('mongodb').ObjectId.createFromHexString;
const {blogSchema} = require('../helpers/validation.js')

const getstudents = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = createObjectId(req.params.id);
    const result = await mongodb.getDb().db("project2").collection('students').find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

const getAllstudents = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDb().db("project2").collection('students').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const createstudents = async (req, res) => {
    //#swagger.tags=['Users']
    const students = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        studentsId: req.body.studentsId,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDb().db("project2").collection('students').insertOne(students);
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}

const updatestudents = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = createObjectId(req.params.id);
    const students = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        studentsId: req.body.studentsId,
        birthday: req.body.birthday
    }

    const response = await mongodb.getDb().db("project2").collection('students').replaceOne({_id: userId}, students);
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}

const deletestudents = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = createObjectId(req.params.id);
    const response = await mongodb.getDb().db("project2").collection('students').deleteOne({_id: userId});
    if(response.acknowledged){
    res.status(200).json(response)
    }
    else{res.status(500).json(response.error || 'There has been an error')}
}
module.exports = {
    getstudents,
    getAllstudents,
    createstudents,
    updatestudents,
    deletestudents
}
