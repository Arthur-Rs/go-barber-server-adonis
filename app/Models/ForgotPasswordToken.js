'use strict'

const Model = use('Model')

const uuid = require('uuid')


class ForgotPasswordToken extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (instance) => {
      instance.token = uuid.v4()
    })
  }
}

module.exports = ForgotPasswordToken
