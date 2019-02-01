const express = require("express");

const games = require("../gamesHelpers/games.js");

const server = express();

server.use(express.json());

const serverError = res => err => {
  res.status(500).json(err);
};
const getSuccess = res => data => {
  res.status(200).json(data);
};

const delSuccess = res => data => {
  res.status(204).json(data);
};

const postSuccess = res => id => {
  res.status(201).json(id);
};
const serverErrorPost = res => err => {
    res.status(422).json(err);
  };

server.get("/games", (req, res) => {
  games
    .getAll()
    .then(getSuccess(res))
    .catch(serverError(res));
});

server.get("/games/:id", async (req, res) => {
  const { id } = req.params;
  games
    .findById(id)
    .then(getSuccess(res))
    .catch(serverError(res));
});

server.post("/games", (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(500).json({ Error_Message: "Provide User Name" });
  } else {
    games
      .insert(body)
      .then(postSuccess(res))
      .catch(serverErrorPost(res));
  }
});

server.delete("/games/:id", (req, res) => {
  const { id } = req.params;
  games
    .remove(id)
    .then(delSuccess(res))
    .catch(serverError(res));
});

module.exports = server;
