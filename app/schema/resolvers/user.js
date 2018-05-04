const {UserService, JwtService} = require('@app/services');
const {User} = require('@app/models');
const errors = require('@app/errors');

exports.Query = {
  users: async () => {
    return await User.find();
  }
}

exports.Mutation = {
  signup: async (_, data) => {
    const {email, password} = data.payload;

    if (!(email && password)) {
      throw errors.route_invalid_data;
    }

    if (!(await UserService.isEmailValid(email))) {
      throw errors.signup_invalid_email_format;
    }

    try {
      return await UserService.create(email, password);
    } catch(e) {
      if (e.code === 11000 && e.name === 'BulkWriteError') {
        throw errors.signup_duplicate_email;
      }

      throw e;
    }   
  },

  signin: async (_, data) => {
    const {email, password} = data.payload;

    if (!(email && password)) {
      throw errors.route_invalid_data;
    }

    if (!(await UserService.authenticate(email, password))) {
      throw errors.login_auth_failed;      
    }

    const user = await UserService.getUserByEmail(email);
    const token = JwtService.signWithUserId(user._id);

    return {user, token};
  }
};