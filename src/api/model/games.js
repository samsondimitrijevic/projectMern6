const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    cover: { type: String, required: true, trim: true },
    id_Platform: [{ type: mongoose.Types.ObjectId, ref: "platforms" }],
    platforms: [
      {
        type: String,
        required: false,
        enum: [
          "PS1",
          "PS2",
          "PS3",
          "PS4",
          "PS5",
          "XBOX360",
          "XBOXONE",
          "SWITCH",
          "Wii",
          "PC",
        ],
        trim: true,
      },
    ],
    price: { type: Number, required: true },
    stock: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    collection: "games",
  }
);

const Game = mongoose.model("games", gameSchema);
module.exports = Game;
