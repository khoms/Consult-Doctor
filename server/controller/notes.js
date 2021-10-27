const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

const Note = require("../models/notes");

//get all users
//Route GET/users

//get single users
//Route GET/users/:id

exports.getNotes = async (req, res, next) => {
  try {
    let query;

    //Copy req.QUery
    const reqQuery = { ...req.query };

    //Fields to exclude
    const removeFields = ["select", "sort"];

    //Lop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // console.log(reqQuery);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Finding resource
    query = Note.find(JSON.parse(queryStr));

    //Select fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      // console.log(fields)
      query = query.select(fields);
    }

    //Sort fields
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    //Executing query
    const notes = await query;

    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    res.status(400).json({ success: false });
  }
  // res.status(200).json({success:true,msg:'Show all users'});
};

exports.getNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return next(
        new ErrorResponse("Note not found with id of" + req.params.id, 404)
      );
    }
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    // res.status(400).json({success:false})
    next(err);
  }
  // res.status(200).json({success:true,msg:'Show user'+req.params.id});
};

//create new user
//Route POST/users
exports.createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ success: true, data: note });
  } catch (err) {
    next(err);
    // res.status(400).json({success:false})
  }
  // console.log(req.body);
  // res.status(200).json({success:true,msg:'Created new User'});
};

//update user
//Route PUT/users/:id
exports.updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false });
  }
  // res.status(200).json({success:true,msg:'Update user'+req.params.id});
};
