"use strict";

const Database = use("Database");
const isAfter = require("date-fns/isAfter");
const getHours = require("date-fns/getHours");

class ProviderHourAvailabilityOnDayController {
  async index({ request, auth }) {
    const { year, month, day } = request.get();

    const parsedDay = day.toString().padStart(2, '0')
    const parsedMonth = month.toString().padStart(2, '0')

    const { rows: AppointmentsOnDay } = await Database.raw(`
        SELECT * FROM appointments
        WHERE TO_CHAR("date", 'YYYY-MM-DD') = '${year}-${parsedMonth}-${parsedDay}'
        AND "provider_id" = '${auth.user.id}'
       `);

    const hourStart = 8;
    const currentDate = new Date(Date.now());

    const eachHourArray = Array.from(
      { length: 11 },
      (_, index) => index + hourStart
    );

    const hoursAvailability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = AppointmentsOnDay.find(
        (appointment) => getHours(appointment.date) === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

      console.log(AppointmentsOnDay)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return hoursAvailability;
  }
}

module.exports = ProviderHourAvailabilityOnDayController;
