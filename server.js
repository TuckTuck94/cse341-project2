const express = require("express");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require("body-parser");
const mongodb = require("./data/database.js");
const app = express();
const createError = require("http-errors");
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 8080;

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");



// Middleware
app.use(cors());
app.use(bodyParser.json());
.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))
//Basic express session({..}) initialization.
.use(passport.initialize())
//init passport on every route call.
.use(passport.session())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  next();
});

// Routes
app.use("/", require("./routes"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});



//use GitHubStrategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: provess.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null,profile);

  //})
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) =>{
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out' )});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: 'api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

// Initialize MongoDB
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node is Running on port ${port}`);
    });
  }
});