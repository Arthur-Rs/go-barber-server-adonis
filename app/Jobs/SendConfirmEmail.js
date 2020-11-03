"use strict";


const Mail = use("Mail");
const Env = use('Env');

class InviteConfirmEmail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return "SendConfirmEmail-job";
  }

  async handle({email, name, token}) {

    const link = `${Env.get('FRONT_APP_URL')}/reset?token=${token}`

    await Mail.send("emails.forgot", {name, link}, (message) => {
      message
        .to(email)
        .from("suporte@gobarber.com", 'Suporte | GoBarber')
        .subject("Recuperação de senha");
    });

  }
}

module.exports = InviteConfirmEmail;
