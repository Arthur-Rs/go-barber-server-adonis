'use strict'

const Model = use('Model')

const Hash = use('Hash')

const Env = use('Env')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('afterCreate', 'SendConfirmEmailHook.send')
  }

  static get hidden () {
    return ['password', 'avatar']
  }

  static get computed () {
    return ['avatar_url']
  }

  getAvatarUrl ({ avatar }) {
    return avatar ? `${Env.get('APP_URL')}/static/${avatar}` : null
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  forgotPasswordToken(){
    return this.hasMany('App/Models/ForgotPasswordToken', 'id', 'user_id')
  }

  appointments () {
    return this.hasMany('App/Models/Appointment', 'id', 'user_id')
  }

  providerAppointments () {
    return this.hasMany('App/Models/Appointment','id', 'provider_id')
  }
}

module.exports = User
