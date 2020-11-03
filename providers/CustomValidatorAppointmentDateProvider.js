"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const getHours = require("date-fns/getHours");
const isPast = require("date-fns/isPast");
const startOfHour = require("date-fns/startOfHour");

class CustomValidatorAppointmentDateProvider extends ServiceProvider {
  boot() {
    const Database = use("Database");
    const Validator = use("Validator");

    const appointmentDateFn = async (data, field, message, args, get) => {
      const date = get(data, field);

      if (!date) {
        return;
      }

      const hours = getHours(date);
      const dateSerialized = startOfHour(date);

      const [before, after] = args;

      if (hours > after) {
        throw message;
      }

      if (hours < before) {
        throw message;
      }

      if (isPast(date)) {
        throw message;
      }

      const row = await Database.table("appointments")
        .where("date", dateSerialized)
        .first();

      if (row) {
        throw message;
      }

    };

    Validator.extend("appointmentDate", appointmentDateFn);
  }
}

module.exports = CustomValidatorAppointmentDateProvider;
