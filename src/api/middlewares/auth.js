const { ValidateSignature } = require("../../utils");

module.exports.userAuth = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);

  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: "Not Authorized" });
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }

  return res.status("503").json({ success: false, message: "Only for admin" });
};
