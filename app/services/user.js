const bcrypt = require('bcryptjs');
const {User} = require('@app/models');

module.exports = services =>
  class UserService {
    costructor(services) {
      this.services = services;
    }

    static async create(email, password) {
      const encryptedPassword = await this.encrypt(password);
      return User.create({email, password: encryptedPassword});
    }

    static async encrypt(password) {
      return bcrypt.hash(password, 10);
    }

    static async isEmailValid(email) {
      return /^[A-Za-z0-9._+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,10}$/.test(email);
    }

    static async authenticate(email, password) {
      const user = await this.getUserByEmail(email);
      if (!user) {
        return false;
      }

      return await bcrypt.compare(password, user.password);
    }

    static async getUserByEmail(email) {
      return User.findOne({email});
    }
  }