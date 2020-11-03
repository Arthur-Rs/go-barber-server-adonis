"use strict";

const Model = use("Model");

class Appointment extends Model {
  user() {
    return this.belongsTo("App/Models/User", "user_id", "id");
  }

  provider() {
    return this.belongsTo("App/Models/User", "provider_id", "id");
  }
}

module.exports = Appointment;
