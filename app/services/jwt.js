const jwt = require('jsonwebtoken');
const jwt_secret = 'asa123jsifj0!#!23kfkczz1231^%mladfkk';

const errors = '../errors'

module.exports = services =>
  class JwtService {
    static signWithUserId(userId) {
      return this.sign({user_id: userId});
    }

    static sign(payload, expiresIn='1y') {
      return jwt.sign(payload, jwt_secret, {
        expiresIn
      });
    }

    static verify(token, cb) {
      if (!cb) {
        return jwt.verifyAsync(token, jwt_secret);
      }
      else {
        return jwt.verify(token, jwt_secret, cb);
      }
    }
  }