"use strict";

const User = use("App/Models/User");
const ForgotPasswordToken = use("App/Models/ForgotPasswordToken");

class RecoverPasswordController {
  async update({ request }) {
    const { password, token } = request.only(["password", "token"]);

    const recoverToken = await ForgotPasswordToken.query()
      .where("token", token)
      .first();


    const user = await User.find(recoverToken.user_id);

    user.password = password;

    await user.save();

    await recoverToken.delete();

    return;
  }
}

module.exports = RecoverPasswordController;
