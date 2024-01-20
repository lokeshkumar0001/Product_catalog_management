const UserService = require("../../services/userService");

const service = new UserService();

module.exports.registerUser = async (req, res, next) => {
  try {
    const data = await service.CreateUser(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const {email,password} = req.body
    const data = await service.LoginUser(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

module.exports.logoutUser = async (req,res,next) => {
  try { 
    const data =  await service.LogoutUser()
    res.json(data)
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
}

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

module.exports.addUserAddress = async (req, res, next) => {
  try {
    const data = await service.addUserAddress({_id:req.user._id,addressInfo:req.body})
    res.json(data)
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
};

module.exports.getAllUser = async(req,res,next) => {
  try {
    const data = await service.findAllUser();
    res.json(data); 
  } catch (error) {
    console.log(error);
    res.json(error.message) 
  }
}

module.exports.updateMe = async(req,res,next) => {
  try {
    const data = await service.updateUser({id:req.user._id.toString(),updatedData:req.body});
    res.json(data); 
  } catch (error) {
    console.log(error);
    res.json(error.message) 
  }
}


module.exports.getUserById = async(req,res,next) => {
  try {
    const data = await service.findUserById(req.params.id);
    res.json(data); 
  } catch (error) {
    console.log(error);
    res.json(error.message) 
  }
}

module.exports.deleteUser = async(req,res,next) => {
  try {
    const id = req.params.id
    const data = await service.deleteUser(id);
    res.json(data)
  } catch (error) {
    res.json(error.message)
  }
}
