"use strict";

const Database = use("Database");
const isAfter = require("date-fns/isAfter");
const getDaysInMonth = require("date-fns/getDaysInMonth");
const getDate = require("date-fns/getDate");

class ListAvailabilityDaysOnMonthController {
  async index({ request, auth }) {
    const { month, year } = request.get();

    const parsedMonth = month.toString().padStart(2, "0");

    const { rows: AppointmentsInMonth } = await Database.raw(`
      SELECT * FROM appointments
      WHERE TO_CHAR("date", 'YYYY-MM') = '${year}-${parsedMonth}'
      AND "provider_id" = '${auth.user.id}'
   `);

    const monthDate = new Date(year, month - 1);

    const numberOfDaysInMonth = getDaysInMonth(monthDate);

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    );

    const daysAvailability = eachDayArray.map((day) => {
      const appointmentsInDay = AppointmentsInMonth.filter(
        (appointment) => getDate(appointment.date) === day
      );

      const compareDate = new Date(year, month - 1, day, 18, 0, 0);

      return {
        day,
        available:
          appointmentsInDay.length < 10 && isAfter(compareDate, new Date()),
      };
    });

    return daysAvailability;
  }
}

module.exports = ListAvailabilityDaysOnMonthController;
