const express = require("express");
const router = express.Router();
const students = require("../controllers/studentsController");
const { handleValidationErrors, blogSchema } = require("../helpers/validation");
const passport = require("passport");

// // Inside route definitions
// router.post(
//   "/students",
//   blogSchema.validateAsync("createstudents"),
//   handleValidationErrors,
//   students.createstudents
// );
// router.put(
//   "/students/:id",
//   blogSchema.validateAsync("updatestudents"),
//   handleValidationErrors,
//   students.updatestudents
// );

// router.get("/", (req, res) => {
//   //#swagger.tags=['Hello World']rs
//   res.send("Hello World");
// });

router.get("/students", students.getAllstudents);
router.get("/students/:id", students.getstudents);
router.post("/students", students.createstudents);
router.put("/students/:id", students.updatestudents);
router.delete("/students/:id", students.deletestudents);

//login and logout routers
router.get("/login", passport.authenticate("GitHubUser"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Error handling middleware
// router.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal server error" });
// });

module.exports = router;
