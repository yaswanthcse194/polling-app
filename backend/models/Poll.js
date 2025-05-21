const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, required: true }, //ex: single-choice, yes/no, rating etc
  options: [
    {
      optionText: { type: String, required: true },
      votes: { type: Number, default: 0 }, //for vote tracking
    },
  ],
  responses: [
    {
      voterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //for open ended polls
      responseText: { type: String }, //user-submitted text response
      createdAt: { type: Date, default: Date.now },
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //to prevent multiple votes
  createdAt: { type: Date, default: Date.now },
  closed: { type: Boolean, default: false }, //to mark polls as closed
});

module.exports = mongoose.model("Poll", PollSchema);
