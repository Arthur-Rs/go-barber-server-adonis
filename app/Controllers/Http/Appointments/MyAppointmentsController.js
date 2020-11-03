'use strict'

class ListMyApointemntController {
  async index ({auth}){

    const appointments = await auth.user.appointments().fetch()

    return appointments
  }
}

module.exports = ListMyApointemntController
