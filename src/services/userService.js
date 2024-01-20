/* eslint-disable no-useless-catch */
const { UserRepository } = require('../database');
const {
  HashPassword,
  GenerateSignature,
  ValidatePassword,
} = require('../utils');

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async CreateUser(userInput) {
    try {
      const password = await HashPassword(userInput.password);
      const user = await this.repository.CreateUser({
        ...userInput,
        password,
      });
      // eslint-disable-next-line no-underscore-dangle
      const token = await GenerateSignature(user._id);

      return { success: true, user, token };
    } catch (error) {
      throw error;
    }
  }

  async LoginUser({ email, password }) {
    try {
      if (!email || !password) {
        const err = new Error();
        err.message = 'Email and password is required';
        err.statusCode = 400;
        throw err;
      }
      const existingUser = await this.repository.FindUser({ email });
      if (existingUser) {
        const validPassword = await ValidatePassword(
          password,
          existingUser.password,
        );

        if (validPassword) {
          // eslint-disable-next-line no-underscore-dangle
          const token = await GenerateSignature(existingUser._id);
          return { success: true, existingUser, token };
        }
      }
      throw new Error('Enter correct email or password');
    } catch (error) {
      throw error;
    }
  }

  async LogoutUser() {
    return { sucess: true, message: 'Logged Out', token: null };
  }

  async addUserAddress({ addressInfo }) {
    const {
      street, postalCode, city, country,
    } = addressInfo;
    try {
      const addressResult = await this.repository.CreateAddress({
        street,
        postalCode,
        city,
        country,
      });
      return { success: true, addressResult };
    } catch (error) {
      throw error;
    }
  }

  async findAllUser() {
    try {
      const data = await this.repository.FindAllUser();
      return data;
    } catch (error) {
      throw new Error('Cannot find user');
    }
  }

  async updateUser({ id, updatedData }) {
    try {
      const { password } = updatedData;
      let hasedPassword;
      if (password) {
        hasedPassword = await HashPassword(password);
      }

      const user = await this.repository.UpdataeUser(id, {
        ...updatedData,
        password: hasedPassword,
      });
      return { success: true, message: 'User updated successfully', user };
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id) {
    try {
      const data = await this.repository.findUserById(id);
      return data;
    } catch (error) {
      throw new Error('User not exists');
    }
  }

  async deleteUser(id) {
    try {
      await this.repository.deleteUser(id);
      return { success: true, message: 'User delete successfully' };
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
