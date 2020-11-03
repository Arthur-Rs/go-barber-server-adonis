"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);

    const tokenData = await auth.attempt(email, password);

    const { token } = tokenData;

    const user = await User.query().where("email", email).first();

    return { user, token };
  }
}

module.exports = SessionController;
