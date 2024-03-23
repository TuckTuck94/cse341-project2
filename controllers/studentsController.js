const mongodb = require("../data/database.js");
const createObjectId = require("mongodb").ObjectId.createFromHexString;
const { validationResult } = require("express-validator");
const { blogSchema } = require("../helpers/validation.js");
const createError = require("http-errors");

const getstudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const _userId = req.params.id;
    const regex = /^[a-zA-Z0-9]+$/;
    if (_userId.length != 24) throw createError(400, "Invalid Length");
    if (!regex.test(_userId)) throw createError(400, "Non-Alphanumeric ID");
    const userId = createObjectId(_userId);
    const result = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .findOne({ _id: userId });
    if (!result) throw createError(404, "Nothing Found");
    const resultJSON = JSON.parse(JSON.stringify(result));
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(resultJSON);
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
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
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const createstudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const students = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentID: req.body.studentID,
      birthday: req.body.birthday,
    };

    // Validate
    const studentData = await blogSchema.validateAsync(students);

    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .insertOne(studentData);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      res.status(500).json(response.error || "There has been an error");
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const updatestudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const _userId = req.params.id;
    const regex = /^[a-zA-Z0-9]+$/;
    if (_userId.length != 24) throw createError(400, "Invalid Length");
    if (!regex.test(_userId)) throw createError(400, "Non-Alphanumeric ID");
    const userId = createObjectId(_userId);
    const students = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      studentID: req.body.studentID,
      birthday: req.body.birthday,
    };
    // Validate request parameters and body
    const studentData = await blogSchema.validateAsync(students);

    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .replaceOne({ _id: userId }, studentData);
    if (response.acknowledged) {
      res.status(200).json(response);
    } else {
      throw createError(500, "Error Occurred during Update");
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const deletestudents = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    const _userId = req.params.id;
    const regex = /^[a-zA-Z0-9]+$/;
    if (_userId.length != 24) throw createError(400, "Invalid Length");
    if (!regex.test(_userId)) throw createError(400, "Non-Alphanumeric ID");
    const userId = createObjectId(_userId);
    const response = await mongodb
      .getDb()
      .db("project2")
      .collection("students")
      .deleteOne({ _id: userId });
    if (response.deletedCount == 0) {
      throw createError(404, "Nothing to delete");
    } else if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      throw createError(500, "Error Occurred during Deletion");
    }
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
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
