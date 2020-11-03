'use strict'

class user {
  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required|min:6|confirmed',
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
    }
  }
}

module.exports = user
