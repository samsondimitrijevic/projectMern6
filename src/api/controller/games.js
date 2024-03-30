const Game = require("../model/games");
const { setError } = require("../../config/error");

// POST (create)
const createGame = async (req, res, next) => {
  try {
    const newGame = new Game(req.body);
    const gameDB = await newGame.save();
    return res.status(201).json(gameDB);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getAllGames = async (req, res, next) => {
  try {
    const allGames = await Game.find().populate("platforms");
    return res.status(200).json(allGames);
  } catch (err) {
    return next(setError(400, err));
  }
};

// GET (read)
const getGameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id).populate("platforms");
    return res.status(200).json(game);
  } catch (err) {
    return next(setError(400, err));
  }
};
// PUT(update)
const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldGame = await Game.findById(id).populate("platforms");

    const newGame = new Game(req.body);

    newGame._id = id;

    if (newGame.platforms) {
      const uniqueSet = new Set([...oldGame.platforms, ...newGame.platforms]);
      newGame.platforms = Array.from(uniqueSet);
    }

    const gameUpdated = await Game.findByIdAndUpdate(id, newGame, {
      new: true,
    });

    return res.status(200).json(gameUpdated);
  } catch (err) {
    return next(setError(400, err));
  }
};
// DELETE (delete)
const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ confirmation: "Game Successfully Deleted!", DeletedGame: game });
  } catch (err) {
    return next(setError(400, err));
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
