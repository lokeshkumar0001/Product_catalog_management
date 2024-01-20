const bcrypt = require("bcrypt");
const { APP_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const UserModel = require("../database/Models/userModel");

module.exports.HashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    return error;
  }
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return jwt.sign({payload}, APP_SECRET, { expiresIn: "10d" });
  } catch (error) {
    return {error:"Failed to genrate JWT token"};
  }
};

module.exports.ValidateSignature = async (req) =>{
  try {
    const sign = req.get('Authorization')
    const payload = await jwt.verify(sign.split(' ')[1],APP_SECRET)
    const user = await UserModel.findOne({_id:payload.payload})
    .populate('address')

    req.user = user;
    return true
  } catch (error) {
    return false
  }
}

module.exports.ValidatePassword = async (userInputPass,pass) => {
  try {
    return await bcrypt.compare(userInputPass,pass)
  } catch (error) {
    console.log(error);
  }
  return false
}