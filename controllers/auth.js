const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const AppError = require("./../utils/AppError");
const User = require("../model/User");
const catchAsync = require("./../utils/catchAsync");

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token: token,
    data: {
      ...user._doc,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //1.) check if username and password exist
  if (!username || !password) {
    return next(new AppError("provide username and password", 400));
  }

  //2.) check if user  exists && password is correct
  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("incorrect username or password", 401));
  }

  const token = signToken(user._id);

  //3.) if everrything ok, send token to client
  res.status(200).json({
    status: "success",
    token: token,
    data: { ...user._doc },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return next(new AppError("not logged in!"));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("user not exist.", 401));
  }

  req.user = user;

  next();
});
