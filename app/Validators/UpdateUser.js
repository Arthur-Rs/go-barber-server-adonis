'use strict'

class UpdateUser {
  get rules () {
    const userEmail = this.ctx.auth.user.email
    console.log(userEmail)

    return {
      name: 'min:3',
      email: `email|unique:users,email,email,${userEmail}`,
      password: 'min:6|confirmed|required_if:old_password',
    }
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email',
    }
  }

}

module.exports = UpdateUser
