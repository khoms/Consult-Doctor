const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
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
      avatar: {
        public_id: "aaaaa",
        url:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmRJxhR_transparent-background-white-user-icon-png-png-download%2F&psig=AOvVaw0BxLLSrbDGTnsJFH6gxlzq&ust=1632238657248000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMi14YDxjfMCFQAAAAAdAAAAABAD",
      },
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
        new ErrorResponse("Please provide an email and password", 400)
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
      return next(new ErrorResponse("Email and Password donot match", 400));
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
        new ErrorResponse("Please provide an Email and pasword", 400)
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
      return next(new ErrorResponse("Email and Password donot match", 400));
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
      return next(new ErrorResponse("Invalid NMC number", 401));
    }

    //Check if pw matches
    const isMatch = await doctor.matchPassword(password);

    if (!isMatch) {
      return next(
        new ErrorResponse("NMC number and Password donot match", 400)
      );
    }

    //Create token
    const token = doctor.getSignedJwtToken();

    res.status(200).json({ success: true, token, data: doctor.id });
  } catch (err) {
    next(err);
  }
};

/// trying for resetting the password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const user = await Admin.findOne({ email: req.body.email });
    if (!user) {
      return next(new ErrorResponse("User not found with this email", 400));
    }
  }
  //Get reset Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset password Url
  // const resetUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset Token is as follow" \n\n${resetToken}\n\n If you have not requested this email ,then ignore it.`;

  try {
    await sendEmail({
      email: "sundp.khoms@gmail.com",
      subject: "Consult Doctor Recovery Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to : ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse(error.message, 500));
  }
});

//Reset Password
exports.checkToken = catchAsyncErrors(async (req, res, next) => {
  //Hash URL token
  const resetPasswordToken = req.body.token;
  const email = req.body.email;
  // crypto
  //   .createHash("sha256")
  //   .update(req.params.token)
  //   .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
    email,
  });

  if (!user) {
    return next(
      new ErrorResponse(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  res.status(200).json({
    success: true,
    message: "Token Matched",
  });
  // if (req.body.password != req.body.confirmPassword) {
  //   return next(new ErrorResponse("Password doesnot match", 400));
  // }

  // //Setup new password
  // user.password = req.body.password;

  // user.resetPasswordToken = undefined;
  // user.resetPasswordExpire = undefined;

  // await user.save();

  // sendToken(user, 200, res);
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorResponse("Password doesnot match", 400));
  }

  //Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
    user,
  });

  // sendToken(user, 200, res);
});
