'use strict'

class SessionUser {
  get rules () {
    return {
      email: 'required|email|exists:users,email',
      password: 'required|min:6',
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
    }
  }
}

module.exports = SessionUser
