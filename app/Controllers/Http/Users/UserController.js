"use strict";

const User = use("App/Models/User");
const Hash = use('Hash')

class UserController {
  async store({ request }) {
    const data = request.only(["name", "email", "password"]);

    const user = await User.create(data);

    return user;
  }

  async update({ request, auth, response }) {
    const { old_password, password, ...data } = request.only([
      "name",
      "email",
      "old_password",
      "password",
    ])

    if(old_password){
      if(!await Hash.verify(old_password, auth.user.password)){
        return response.status('401').json({
          error:{
            code: 401,
            codeError: 'Unauthorized',
            message: 'Your not be authorized'
          }
        })
      }

      auth.user.password = password
    }

    auth.user.merge(data)

    await auth.user.save()

    const user = auth.user

    return user
  }
}

module.exports = UserController;
