'use strict'

const User = use("App/Models/User");

class ListProviderController {
  async index ({auth}){
    const users = await User.query()
      .where('id', '!=', auth.user.id)
      .fetch()

    return users
  }
}

module.exports = ListProviderController
