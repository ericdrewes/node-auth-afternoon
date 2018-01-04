const passport = require("passport");
const strategy = require(`${__dirname}/strategy.js`);
const express = require("express");
const session = require("express-session");
const request = require("request");

const port = 3000;

const app = express();

app.use(
  session({
    secret: "thisisasecret",
    resave: false,
    saveUnitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  const { _json } = user;
  done(null, {
    clientID: _json.clientID,
    email: _json.email,
    name: _json.name,
    followers_url: _json.followers_url
  });
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/followers",
    failureRedirect: "/login"
  })
);

app.get("/followers", (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    const followersRequest = {
      url: req.user.followers_url,
      headers: {
        "User-Agent": req.user.clientID
      }
    };
    request(followersRequest, (error, response, body) => {
      res.status(200).send(body);
    });
  } else {
    res.redirect("/login");
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
