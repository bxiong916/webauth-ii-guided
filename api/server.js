const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

const sessionConfig = {
  name: "monkey", // sid,
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true, // GDPR laws against setting cookies automatically (always false!!)
};

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
