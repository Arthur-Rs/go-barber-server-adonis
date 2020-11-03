"use strict";

const Kue = use("Kue");
const SendForgotEmailJob = use("App/Jobs/SendForgotEmail");
const ForgotPasswordToken = use("App/Models/ForgotPasswordToken");

const User = use("App/Models/User");

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input("email");

    const user = await User.query().where("email", email).first();

    const { id, name } = user;

    await ForgotPasswordToken
      .query()
      .where('user_id', id)
      .delete()

    const {token} = await user.forgotPasswordToken().create({});

    Kue.dispatch(
      SendForgotEmailJob.key,
      { email, name, token },
      { attempts: 3 }
    );

    return;
  }
}

module.exports = ForgotPasswordController;
