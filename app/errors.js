const errors = {
  route_invalid_data: {
    desc: 'Data is empty or invalid'
  },
  signup_invalid_email_format: {
    desc: 'Email format is invalid'
  },
  signup_duplicate_email: {
    desc: 'Email is already taken'
  },
  login_auth_failed: {
    desc: 'Email and password is not matched'
  }
};

Object.keys(errors).forEach(code => {
  const {desc} = errors[code];
  const error = new Error(desc);
  error.code = code;

  exports[code] = error;
});