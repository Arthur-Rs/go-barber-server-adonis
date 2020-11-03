'use strict'

class RecoverPassword {
  get rules () {
    return {
      token: "string|forgotPasswordToken:30",
      password: 'string|min:6|confirmed',
    }
  }
}

module.exports = RecoverPassword
