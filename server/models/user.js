const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const User = mongoose.model('User', {
//     name: {
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add yout name"],
    trim: true,
    // unique:true
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    },
  },

  phone: {
    type: String,
    maxLength: [10, "Phone number can not be longer than 10 characters"],
  },
  address: {
    type: String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: "aaaaa",
    },
    url: {
      type: String,
      required: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FhmRJxhR_transparent-background-white-user-icon-png-png-download%2F&psig=AOvVaw0BxLLSrbDGTnsJFH6gxlzq&ust=1632238657248000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMi14YDxjfMCFQAAAAAdAAAAABAD",
    },
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  height: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("height must be a postive number");
      }
      if (value > 300) {
        throw new Error("height cannot be grater than 300cm");
      }
    },
  },
  weight: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Weight must be a postive number");
      }
      if (value > 300) {
        throw new Error("Weight cannot be grater than 300kg");
      }
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Encrypt password using bc

// rypt;
UserSchema.methods.encryptPassword = async function (pw) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.pw, salt);
};

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  //Generate token
  const resetToken = Math.trunc(Math.random() * 10000);

  //Hash and set to resetPasswordToken
  this.resetPasswordToken = resetToken;

  //   crypto
  //     .createHmac("khoms123", "230664ae53cbe5a07c6c389910540729")
  //     .update(resetToken)
  //     .digest("hex");
  // //Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("User", UserSchema);
