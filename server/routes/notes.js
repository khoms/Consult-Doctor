const express = require("express");

const {
  getNote,
  getNotes,
  createNote,
  updateNote,
} = require("../controller/notes");

const router = new express.Router();
router.route("/").get(getNotes).post(createNote);

router.route("/:id").get(getNote).put(updateNote);

module.exports = router;
