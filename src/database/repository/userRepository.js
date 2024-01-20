/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-catch */
const addressModel = require('../Models/addressModel');
const UserModel = require('../Models/userModel');

class UserRepository {
  async CreateUser(userInput) {  // eslint-disable-line
    try {
      const newUser = new UserModel({
        ...userInput,
      });
      const userResult = await newUser.save();
      return userResult;
    } catch (error) {
      if (error.code === 11000) {
        const err = new Error();
        err.success = false;
        err.statusCode = 500;
        err.message = 'User already exists';
        throw err;
      }
      throw error;
    }
  }

  async FindUser(email) {
    try {
      const user = await UserModel.findOne(email);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async CreateAddress({
    _id, street, postalCode, city, country,
  }) {
    try {
      const user = await UserModel.findOne(_id);

      if (user) {
        const newAddress = new addressModel({
          street,
          postalCode,
          city,
          country,
        });

        await newAddress.save();

        user.address.push(newAddress);
      }

      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async FindAllUser() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      return error;
    }
  }

  async UpdataeUser(id, updateUser) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, updateUser, {
        new: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await UserModel.deleteOne(({ _id: id }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
