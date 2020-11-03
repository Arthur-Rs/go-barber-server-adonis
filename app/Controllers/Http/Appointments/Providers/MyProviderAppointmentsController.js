'use strict'

class ListMyProviderAppointmentController {
  async index ({auth}){

    const appointments = await auth.user
      .providerAppointments()
      .with('user')
      .setHidden(['provider_id'])
      .fetch()

    return appointments
  }
}

module.exports = ListMyProviderAppointmentController
