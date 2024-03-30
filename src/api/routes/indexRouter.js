const gamesRoutes = require("./games");
const plaformsRoutes = require("./platforms");

const indexRouter = require("express").Router();

indexRouter.use("/games", gamesRoutes);
indexRouter.use("/platforms", plaformsRoutes);

module.exports = { indexRouter };
