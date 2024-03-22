const express = require("express");
const router = express.Router();
const students = require("../controllers/studentsController");
const { handleValidationErrors } = require("../helpers/validation");

// Inside route definitions
router.post(
  "/students",
  validate("createstudents"),
  handleValidationErrors,
  students.createstudents
);
router.put(
  "/students/:id",
  validate("updatestudents"),
  handleValidationErrors,
  students.updatestudents
);

router.get("/", (req, res) => {
  //#swagger.tags=['Hello World']rs
  res.send("Hello World");
});

router.get("/students", students.getAllstudents);
router.get("/students/:id", students.getstudents);
router.post("/students", students.createstudents);
router.put("/students/:id", students.updatestudents);
router.delete("/students/:id", students.deletestudents);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = router;
