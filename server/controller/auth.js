const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

const User = require("../models/user");
const Admin = require("../models/admin");
const Doctor = require("../models/doctor");

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    //Create User
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token, data: user.id });
  } catch (err) {
    next(err);
  }
};

//Login user
//Post
//auth/login

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Validate email and password
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and pasword", 400)
      );
    }

    //Check for USer
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Email", 401));
    }

    //Check if pw matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Entries", 400));
    }

    //Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token, data: user.id });
  } catch (err) {
    next(err);
  }
};

exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Validate email and password
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and pasword", 400)
      );
    }

    //Check for USer
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return next(new ErrorResponse("Invalid Email", 401));
    }

    //Check if pw matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Entries", 400));
    }

    //Create token
    const token = admin.getSignedJwtToken();

    res.status(200).json({ success: true, token, data: admin.id });
  } catch (err) {
    next(err);
  }
};

exports.loginDoctor = async (req, res, next) => {
  const { nmcNo, password } = req.body;

  try {
    //Validate email and password
    if (!nmcNo || !password) {
      return next(
        new ErrorResponse("Please provide an email and pasword", 400)
      );
    }

    //Check for USer
    const doctor = await Doctor.findOne({ nmcNo }).select("+password");

    if (!doctor) {
      return next(new ErrorResponse("Invalid Email", 401));
    }

    //Check if pw matches
    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Entries", 400));
    }

    //Create token
    const token = doctor.getSignedJwtToken();

    res.status(200).json({ success: true, token, data: doctor.id });
  } catch (err) {
    next(err);
  }
};
