"use strict";

const Kue = use("Kue");
const SendConfirmEmailJob = use("App/Jobs/SendConfirmEmail");

const SendConfirmEmailHook = (exports = module.exports = {});

SendConfirmEmailHook.send = async ({ email }) => {
  Kue.dispatch(SendConfirmEmailJob.key, { email }, { attempts: 3 });
};
