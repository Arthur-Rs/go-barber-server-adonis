"use strict";

const startOfHour = require('date-fns/startOfHour')

class AppointmentController {
  async store({ request, auth }) {
    const {provider_id, date} = request.only(['provider_id', 'date'])

    const serializedDate = startOfHour(date)

    const appointments = await auth.user
      .appointments()
      .create({
        date: serializedDate,
        provider_id,
      })

    return appointments
  }
}

module.exports = AppointmentController;
