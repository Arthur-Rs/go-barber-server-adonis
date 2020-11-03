"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

const isAfter = require("date-fns/isAfter");
const addMinutes = require("date-fns/addMinutes");

class CustomValidatorForgotPasswordToken extends ServiceProvider {
  boot() {
    const Database = use("Database");
    const Validator = use("Validator");

    const forgotPasswordTokenFn = async (data, field, message, args, get) => {
      const value = get(data, field);
      if (!value) {
        return;
      }

      const row = await Database.table("forgot_password_tokens")
        .where("token", value)
        .first();

      const [minutes] = args;

      if (!row) {
        throw message;
      }

      const limitDate = addMinutes(new Date(), minutes);

      if (isAfter(row.created_at, limitDate)) {
        throw message;
      }

    };

    Validator.extend("forgotPasswordToken", forgotPasswordTokenFn);
  }
}

module.exports = CustomValidatorForgotPasswordToken;
