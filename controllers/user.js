const User = require("./../model/User");
const catchAsync = require("./../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ $and: [{ isAdmin: { $ne: true } }] });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
