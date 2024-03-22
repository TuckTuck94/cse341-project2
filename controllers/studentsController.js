const mongodb = require("../data/database.js");
const createObjectId = require("mongodb").ObjectId.createFromHexString;
const { validationResult } = require("express-validator");
const { validate } = require("../helpers/validation.js");

const getstudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const userId = createObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    next(error);
  }
};

const getAllstudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const result = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    next(error);
  }
};

const createstudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    // Validate request body
    validate("createstudents")(req, res, next);

    const students = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentsId: req.body.studentsId,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .insertOne(students);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || "There has been an error");
    }
  } catch (error) {
    next(error);
  }
};

const updatestudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    // Validate request parameters and body
    validate("updatestudents")(req, res, next);

    const userId = createObjectId(req.params.id);
    const students = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentsId: req.body.studentsId,
      birthday: req.body.birthday,
    };

    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .replaceOne({ _id: userId }, students);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || "There has been an error");
    }
  } catch (error) {
    next(error);
  }
};

const deletestudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const userId = createObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .deleteOne({ _id: userId });
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || "There has been an error");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getstudents,
  getAllstudents,
  createstudents,
  updatestudents,
  deletestudents,
};
