'use strict'

class CreateAppointments {
  get sanitizationRules () {
    return {
      date: 'to_date'
    }
  }

  get rules () {

    const UserId = this.ctx.auth.user.id

    return {
      date: `required|date|appointmentDate:8, 18`,
      provider_id: `required|exists:users,id|not_in:${UserId}`,
    }
  }
}

module.exports = CreateAppointments
